# Save the current directory automatically using Push-Location
Push-Location "react-app"  # Replace with your subdirectory

try {
    Write-Host "Running Build.."
    npm run build
}
catch {
    Write-Host "An error occurred: $_"
}
finally {
    # Return to the original directory automatically
    Pop-Location
}

Push-Location "dist"
try {
    Write-Host "Running Serve..."
    npx serve -l 500
}
catch {
    Write-Host "An error occurred: $_"
}
finally {
    # Return to the original directory automatically
    Pop-Location
}

Write-Host "Back in original directory"
npx serve .
