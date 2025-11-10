# Script para configurar el Firewall de Windows
# Ejecutar como Administrador

Write-Host "🔥 Configurando Firewall para Next.js (Puerto 3001)..." -ForegroundColor Cyan

# Eliminar regla anterior si existe
$existingRule = Get-NetFirewallRule -DisplayName "Next.js Dev Server Port 3001" -ErrorAction SilentlyContinue
if ($existingRule) {
    Write-Host "⚠️  Eliminando regla anterior..." -ForegroundColor Yellow
    Remove-NetFirewallRule -DisplayName "Next.js Dev Server Port 3001"
}

# Crear nueva regla de entrada (TCP)
New-NetFirewallRule `
    -DisplayName "Next.js Dev Server Port 3001" `
    -Direction Inbound `
    -LocalPort 3001 `
    -Protocol TCP `
    -Action Allow `
    -Profile Any `
    -Description "Permite acceso al servidor de desarrollo Next.js desde dispositivos en la red local"

Write-Host "✅ Firewall configurado correctamente!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Ahora puedes acceder desde tu móvil a:" -ForegroundColor Cyan
Write-Host "   http://192.168.9.104:3001" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Para iniciar el servidor, ejecuta:" -ForegroundColor Cyan
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""

# Mostrar la IP actual
$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -like "192.168.*" } | Select-Object -First 1).IPAddress
Write-Host "🌐 Tu IP actual es: $ip" -ForegroundColor Green
