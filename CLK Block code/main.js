const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const { SerialPort } = require('serialport');
const fs = require('fs');
const { exec, spawn } = require('child_process');
const os = require('os');

// Global variable to hold the currently open serial port instance
let currentPort = null;
let mainWindow = null; // Add this line to hold the main window reference
let maximizeDebounce = false;

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.join(__dirname, 'img', 'clklogo.png'),
        frame: true,
        titleBarStyle: 'hidden',
        fullscreenable: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('index.html');
    mainWindow = win; // Assign the window to the global variable

    // Pencereyi maximize et (tam ekran yerine)
    win.maximize();

    // Menü çubuğunu kaldır
    Menu.setApplicationMenu(null);
}

app.whenReady().then(() => {
    createWindow();

    // Ctrl+Shift+I ile geliştirici araçlarını açma kısayolu
    const { globalShortcut } = require('electron');
    globalShortcut.register('CmdOrCtrl+Shift+I', () => {
        if (mainWindow) {
            mainWindow.webContents.openDevTools();
        }
    });
});

// Seri portları listele
ipcMain.handle('list-serial-ports', async() => {
    const ports = await SerialPort.list();
    console.log('Bulunan portlar:', ports);
    return ports;
});

// Seri port açma handler'ı ekle
ipcMain.handle('open-serial-port', async(event, { path, baudRate = 115200 }) => {
    try {
        // If a port is already open, close it before opening a new one
        if (currentPort && currentPort.isOpen) {
            await new Promise((resolve, reject) => {
                currentPort.close(err => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            currentPort = null;
        }

        const port = new SerialPort({ path, baudRate, autoOpen: false });
        await new Promise((resolve, reject) => {
            port.open(err => {
                if (err) reject(err);
                else resolve();
            });
        });
        currentPort = port; // Set the global currentPort

        // Seri porttan gelen verileri dinle ve renderer process'e gönder
        currentPort.on('data', data => {
            if (mainWindow) {
                // Gelen veriyi doğrudan stringe çevirip gönder
                const text = new TextDecoder().decode(data);
                mainWindow.webContents.send('serial-data', text);
            }
        });

        return { success: true };
    } catch (err) {
        console.error("Seri port açılırken hata oluştu:", err);
        return { success: false, error: err.message };
    }
});

// Seri port kapatma handler'ı ekle
ipcMain.handle('close-serial-port', async() => {
    if (currentPort && currentPort.isOpen) {
        try {
            await new Promise((resolve, reject) => {
                currentPort.close(err => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            currentPort = null;
            return { success: true };
        } catch (err) {
            console.error("Seri port kapatılırken hata oluştu:", err);
            return { success: false, error: err.message };
        }
    } else {
        return { success: false, error: "Seri port zaten kapalı." };
    }
});

// Kod yükleme için IPC handler
ipcMain.handle('upload-arduino', async(event, { code, port, board }) => {
    // Kodu yüklemeden önce mevcut portu kapat
    if (currentPort && currentPort.isOpen) {
        try {
            await new Promise((resolve, reject) => {
                currentPort.close(err => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            currentPort = null;
            // Portun tamamen serbest bırakılması için gecikmeyi 3 saniyeye çıkar
            await new Promise(resolve => setTimeout(resolve, 3000));
        } catch (closeErr) {
            console.error("Mevcut port kapatılırken hata oluştu:", closeErr);
            // Kapatma hatası olsa bile yüklemeye devam etmeye çalış
        }
    }
    const tempDir = os.tmpdir();
    const sketchName = 'clkblock_temp';
    const sketchFolder = path.join(tempDir, sketchName);
    const inoPath = path.join(sketchFolder, sketchName + '.ino');
    try {
        // Klasör yoksa oluştur
        if (!fs.existsSync(sketchFolder)) {
            fs.mkdirSync(sketchFolder);
        }
        fs.writeFileSync(inoPath, code, 'utf8');
        const cliPath = app.isPackaged ?
            path.join(path.dirname(process.execPath), 'resources', 'bin', 'arduinocli.exe') :
            path.join(__dirname, 'bin', 'arduinocli.exe');
        const fqbn = board || 'arduino:avr:nano';
        // Derleme
        const compileArgs = ['compile', '--fqbn', fqbn, sketchFolder];
        const compileResult = await new Promise((resolve) => {
            try {
                const proc = spawn(cliPath, compileArgs, { windowsHide: true });
                let stdout = '';
                let stderr = '';
                proc.stdout.on('data', data => { stdout += data.toString(); });
                proc.stderr.on('data', data => { stderr += data.toString(); });
                proc.on('close', code => {
                    if (code !== 0) {
                        resolve({ success: false, error: `Derleme hatası (kod ${code})`, details: stderr || stdout });
                    } else {
                        resolve({ success: true, output: stdout });
                    }
                });
                proc.on('error', err => {
                    resolve({ success: false, error: 'CLI başlatılamadı', details: err.message });
                });
            } catch (err) {
                resolve({ success: false, error: 'CLI spawn hatası', details: err.message });
            }
        });
        if (!compileResult.success) return compileResult;
        // Yükleme
        const uploadArgs = ['upload', '-p', port, '--fqbn', fqbn, sketchFolder];
        const uploadResult = await new Promise((resolve) => {
            try {
                const proc = spawn(cliPath, uploadArgs, { windowsHide: true });
                let stdout = '';
                let stderr = '';
                proc.stdout.on('data', data => { stdout += data.toString(); });
                proc.stderr.on('data', data => { stderr += data.toString(); });
                proc.on('close', code => {
                    if (code !== 0) {
                        resolve({ success: false, error: `Yükleme hatası (kod ${code})`, details: stderr || stdout });
                    } else {
                        resolve({ success: true, output: stdout });
                    }
                });
                proc.on('error', err => {
                    resolve({ success: false, error: 'CLI başlatılamadı', details: err.message });
                });
            } catch (err) {
                resolve({ success: false, error: 'CLI spawn hatası', details: err.message });
            }
        });
        // Geçici dosya ve klasörü sil (isteğe bağlı, hata olursa yoksay)
        try {
            fs.unlinkSync(inoPath);
            fs.rmdirSync(sketchFolder);
        } catch {}
        return uploadResult;
    } catch (err) {
        return { success: false, error: err.message };
    }
});

// Kod derleme için IPC handler
ipcMain.handle('compile-arduino', async(event, { code, board }) => {
    const tempDir = os.tmpdir();
    const sketchName = 'clkblock_temp_compile';
    const sketchFolder = path.join(tempDir, sketchName);
    const inoPath = path.join(sketchFolder, sketchName + '.ino');
    try {
        if (!fs.existsSync(sketchFolder)) {
            fs.mkdirSync(sketchFolder, { recursive: true });
        }
        fs.writeFileSync(inoPath, code, 'utf8');

        const cliPath = app.isPackaged ?
            path.join(path.dirname(process.execPath), 'resources', 'bin', 'arduinocli.exe') :
            path.join(__dirname, 'bin', 'arduinocli.exe');
        const fqbn = board || 'arduino:avr:nano';
        const compileArgs = ['compile', '--fqbn', fqbn, sketchFolder];

        const compileResult = await new Promise((resolve) => {
            try {
                const proc = spawn(cliPath, compileArgs, { windowsHide: true });
                let stdout = '';
                let stderr = '';
                proc.stdout.on('data', data => { stdout += data.toString(); });
                proc.stderr.on('data', data => { stderr += data.toString(); });
                proc.on('close', code => {
                    if (code !== 0) {
                        resolve({ success: false, error: `Derleme hatası (kod ${code})`, details: stderr || stdout });
                    } else {
                        resolve({ success: true, output: stdout || 'Derleme başarılı.' });
                    }
                });
                proc.on('error', err => {
                    resolve({ success: false, error: 'CLI başlatılamadı', details: err.message });
                });
            } catch (err) {
                resolve({ success: false, error: 'CLI spawn hatası', details: err.message });
            }
        });

        try {
            fs.unlinkSync(inoPath);
            fs.rmdirSync(sketchFolder);
        } catch {}

        return compileResult;

    } catch (err) {
        return { success: false, error: err.message };
    }
});

// Seri porta veri yazma handler'ı ekle
ipcMain.handle('write-serial-port', async(event, { message }) => {
    if (currentPort && currentPort.isOpen) {
        return new Promise((resolve) => {
            currentPort.write(message, (err) => {
                if (err) {
                    console.error("Seri porta yazma hatası:", err);
                    resolve({ success: false, error: err.message });
                } else {
                    resolve({ success: true });
                }
            });
        });
    } else {
        return { success: false, error: "Seri port açık değil." };
    }
});

ipcMain.on('window-minimize', () => {
    if (mainWindow) mainWindow.minimize();
});

ipcMain.on('window-maximize', () => {
    if (mainWindow && !maximizeDebounce) {
        maximizeDebounce = true;
        if (mainWindow.isFullScreen()) {
            mainWindow.setFullScreen(false);
        } else if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
        setTimeout(() => { maximizeDebounce = false; }, 300);
    }
});

ipcMain.on('window-close', () => {
    if (mainWindow) mainWindow.close();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});