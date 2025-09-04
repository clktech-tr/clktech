$ErrorActionPreference = "Stop"
$logFile = "server-output.txt"

# Clear previous log
if (Test-Path $logFile) {
    Remove-Item $logFile -Force
}

# Start the server and redirect output to file
$process = Start-Process -FilePath "node" -ArgumentList "test-server-fixed.js" -NoNewWindow -PassThru -RedirectStandardOutput $logFile -RedirectStandardError "error-$logFile"

Write-Host "Server started with PID $($process.Id)"
Write-Host "Output is being written to $((Get-Item $PWD).FullName)\$logFile"
Write-Host "Errors are being written to $((Get-Item $PWD).FullName)\error-$logFile"
Write-Host ""
Write-Host "Press any key to stop the server..."

# Wait for a key press
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Stop the server
Write-Host "`nStopping server..."
Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue

# Show the output
Write-Host "`nServer output:"
Get-Content $logFile -ErrorAction SilentlyContinue

Write-Host "`nError output:"
Get-Content "error-$logFile" -ErrorAction SilentlyContinue
