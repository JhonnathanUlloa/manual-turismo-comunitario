# 🚀 Script de Inicio Rápido para Windows PowerShell
# Manual Interactivo 3D - Sistema de Turismo Comunitario

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  MANUAL INTERACTIVO 3D" -ForegroundColor Yellow
Write-Host "  Sistema de Turismo Comunitario" -ForegroundColor White
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Función para verificar si un comando existe
function Test-CommandExists {
    param($command)
    $oldPreference = $ErrorActionPreference
    $ErrorActionPreference = 'stop'
    try {
        if(Get-Command $command) { return $true }
    }
    catch { return $false }
    finally { $ErrorActionPreference = $oldPreference }
}

# Verificar Node.js
Write-Host "Verificando requisitos previos..." -ForegroundColor Green
Write-Host ""

if (Test-CommandExists node) {
    $nodeVersion = node --version
    Write-Host "✓ Node.js encontrado: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js NO encontrado" -ForegroundColor Red
    Write-Host "  Por favor instala Node.js desde: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "  Presiona cualquier tecla para salir..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

# Verificar npm
if (Test-CommandExists npm) {
    $npmVersion = npm --version
    Write-Host "✓ npm encontrado: v$npmVersion" -ForegroundColor Green
} else {
    Write-Host "✗ npm NO encontrado" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Menú de opciones
Write-Host "Selecciona una opción:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Instalación completa (primera vez)" -ForegroundColor White
Write-Host "2. Iniciar servidor de desarrollo" -ForegroundColor White
Write-Host "3. Procesar manual (dividir en secciones)" -ForegroundColor White
Write-Host "4. Compilar para producción" -ForegroundColor White
Write-Host "5. Iniciar servidor de producción" -ForegroundColor White
Write-Host "6. Limpiar y reinstalar dependencias" -ForegroundColor White
Write-Host "7. Salir" -ForegroundColor White
Write-Host ""

$opcion = Read-Host "Ingresa el número de tu opción"

switch ($opcion) {
    "1" {
        Write-Host ""
        Write-Host "=== INSTALACIÓN COMPLETA ===" -ForegroundColor Cyan
        Write-Host ""
        
        Write-Host "Paso 1/3: Instalando dependencias..." -ForegroundColor Yellow
        npm install
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ Dependencias instaladas correctamente" -ForegroundColor Green
            
            Write-Host ""
            Write-Host "Paso 2/3: Procesando manual..." -ForegroundColor Yellow
            npm run split-manual
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✓ Manual procesado correctamente" -ForegroundColor Green
                
                Write-Host ""
                Write-Host "Paso 3/3: Iniciando servidor de desarrollo..." -ForegroundColor Yellow
                Write-Host ""
                Write-Host "=== SERVIDOR INICIADO ===" -ForegroundColor Green
                Write-Host "Abre tu navegador en: http://localhost:3000" -ForegroundColor Cyan
                Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
                Write-Host ""
                npm run dev
            } else {
                Write-Host "✗ Error al procesar el manual" -ForegroundColor Red
                Write-Host "Verifica que el archivo MANUAL_USUARIO_TURISMO_COMUNITARIO.txt exista" -ForegroundColor Yellow
            }
        } else {
            Write-Host "✗ Error al instalar dependencias" -ForegroundColor Red
        }
    }
    
    "2" {
        Write-Host ""
        Write-Host "=== INICIANDO SERVIDOR DE DESARROLLO ===" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Servidor disponible en: http://localhost:3000" -ForegroundColor Cyan
        Write-Host "Presiona Ctrl+C para detener" -ForegroundColor Yellow
        Write-Host ""
        npm run dev
    }
    
    "3" {
        Write-Host ""
        Write-Host "=== PROCESANDO MANUAL ===" -ForegroundColor Cyan
        Write-Host ""
        npm run split-manual
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "✓ Manual procesado correctamente" -ForegroundColor Green
            Write-Host "Los datos están en: src/data/manualData.ts" -ForegroundColor White
        } else {
            Write-Host ""
            Write-Host "✗ Error al procesar el manual" -ForegroundColor Red
        }
    }
    
    "4" {
        Write-Host ""
        Write-Host "=== COMPILANDO PARA PRODUCCIÓN ===" -ForegroundColor Cyan
        Write-Host ""
        npm run build
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "✓ Compilación exitosa" -ForegroundColor Green
            Write-Host "Los archivos están en: .next/" -ForegroundColor White
            Write-Host ""
            Write-Host "Para iniciar el servidor de producción, ejecuta la opción 5" -ForegroundColor Yellow
        } else {
            Write-Host ""
            Write-Host "✗ Error en la compilación" -ForegroundColor Red
        }
    }
    
    "5" {
        Write-Host ""
        Write-Host "=== INICIANDO SERVIDOR DE PRODUCCIÓN ===" -ForegroundColor Cyan
        Write-Host ""
        
        if (Test-Path ".next") {
            Write-Host "Servidor disponible en: http://localhost:3000" -ForegroundColor Cyan
            Write-Host "Presiona Ctrl+C para detener" -ForegroundColor Yellow
            Write-Host ""
            npm run start
        } else {
            Write-Host "✗ No se encontró la compilación de producción" -ForegroundColor Red
            Write-Host "Primero ejecuta la opción 4 para compilar" -ForegroundColor Yellow
        }
    }
    
    "6" {
        Write-Host ""
        Write-Host "=== LIMPIANDO Y REINSTALANDO ===" -ForegroundColor Cyan
        Write-Host ""
        
        Write-Host "Eliminando node_modules..." -ForegroundColor Yellow
        if (Test-Path "node_modules") {
            Remove-Item -Recurse -Force "node_modules"
            Write-Host "✓ node_modules eliminado" -ForegroundColor Green
        }
        
        Write-Host "Eliminando package-lock.json..." -ForegroundColor Yellow
        if (Test-Path "package-lock.json") {
            Remove-Item -Force "package-lock.json"
            Write-Host "✓ package-lock.json eliminado" -ForegroundColor Green
        }
        
        Write-Host ""
        Write-Host "Reinstalando dependencias..." -ForegroundColor Yellow
        npm install
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "✓ Dependencias reinstaladas correctamente" -ForegroundColor Green
        } else {
            Write-Host ""
            Write-Host "✗ Error al reinstalar dependencias" -ForegroundColor Red
        }
    }
    
    "7" {
        Write-Host ""
        Write-Host "¡Hasta luego! 👋" -ForegroundColor Cyan
        exit 0
    }
    
    default {
        Write-Host ""
        Write-Host "✗ Opción no válida" -ForegroundColor Red
        Write-Host "Por favor selecciona una opción del 1 al 7" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Presiona cualquier tecla para salir..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
