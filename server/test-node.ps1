Write-Host "Testing Node.js installation..."

# Test 1: Check Node.js version
Write-Host "`n[Test 1] Node.js version:"
node --version

# Test 2: Simple JavaScript execution
Write-Host "`n[Test 2] Simple JavaScript execution:"
node -e "console.log('Hello from Node.js')"

# Test 3: File system access
Write-Host "`n[Test 3] File system access:"
$testFile = "$PWD\node-test-file.txt"
node -e "require('fs').writeFileSync('$testFile', 'Test content')"
Write-Host "File created: $(Test-Path $testFile)"
Remove-Item $testFile -ErrorAction SilentlyContinue

# Test 4: HTTP server test
Write-Host "`n[Test 4] Starting HTTP server test..."
$serverScript = "$PWD\temp-server.js"
@'
const http = require('http');
const server = http.createServer((req, res) => {
  res.end('Test server is working!');  
});
server.listen(0, '127.0.0.1', () => {
  const port = server.address().port;
  console.log(`Server running at http://127.0.0.1:${port}`);
  console.log('READY');
});
'@ | Out-File -FilePath $serverScript -Encoding ascii

$process = Start-Process -FilePath "node" -ArgumentList $serverScript -NoNewWindow -PassThru -RedirectStandardOutput "$PWD\server-output.txt"

# Wait for server to start
$startTime = Get-Date
$serverReady = $false

while (((Get-Date) - $startTime).TotalSeconds -lt 10) {
  if (Test-Path "$PWD\server-output.txt") {
    $output = Get-Content "$PWD\server-output.txt" -Raw
    if ($output -match 'READY') {
      $serverReady = $true
      break
    }
  }
  Start-Sleep -Milliseconds 100
}

if ($serverReady) {
  $port = [regex]::Match($output, 'http://127.0.0.1:(\d+)').Groups[1].Value
  Write-Host "Server started on port $port"
  
  # Test HTTP request
  try {
    $response = Invoke-WebRequest -Uri "http://127.0.0.1:$port" -UseBasicParsing
    Write-Host "HTTP request successful. Status code: $($response.StatusCode)"
    Write-Host "Response: $($response.Content)"
  } catch {
    Write-Host "HTTP request failed: $_" -ForegroundColor Red
  }
  
  # Cleanup
  Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
} else {
  Write-Host "Failed to start test server" -ForegroundColor Red
  Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
}

# Cleanup
Remove-Item $serverScript -ErrorAction SilentlyContinue
Remove-Item "$PWD\server-output.txt" -ErrorAction SilentlyContinue
