# 🚀 Inicio Rápido - Acceso Móvil

## 📱 Para ver en tu celular:

### Opción 1: Ejecutar el script BAT
```bash
# Doble clic en:
start-server.bat
```

### Opción 2: Comando manual
```bash
npm run dev
```

### Opción 3: PowerShell
```powershell
cd manual-interactivo-3d
npm run dev
```

---

## 🌐 URLs de Acceso

- **Desde tu PC:** http://localhost:3001
- **Desde tu móvil:** http://192.168.9.104:3001

---

## 🔥 Configurar Firewall (IMPORTANTE)

**Solo la primera vez**, ejecuta como Administrador:

```powershell
# Clic derecho en PowerShell → Ejecutar como Administrador
cd manual-interactivo-3d
.\setup-firewall.ps1
```

O manualmente:
```powershell
New-NetFirewallRule -DisplayName "Next.js Dev Server Port 3001" -Direction Inbound -LocalPort 3001 -Protocol TCP -Action Allow
```

---

## ✅ Verificar que funciona

1. **Inicia el servidor:**
   ```bash
   npm run dev
   ```

2. **Debes ver:**
   ```
   ✓ Ready on http://0.0.0.0:3001
   ```

3. **En tu móvil:**
   - Conecta al mismo WiFi
   - Abre el navegador
   - Escribe: `192.168.9.104:3001`

---

## 🛠️ Solución de Problemas

### ❌ "No se puede conectar"

1. Verifica misma red WiFi
2. Firewall configurado
3. Servidor corriendo (`npm run dev`)
4. IP correcta (ejecuta `ipconfig`)

### ❌ "Connection refused"

```powershell
# Verificar firewall
Get-NetFirewallRule -DisplayName "*Next.js*"

# Ver puerto 3001
netstat -ano | findstr :3001
```

### 🔄 Si cambió tu IP

```powershell
ipconfig
# Busca "Dirección IPv4" en WiFi
```

---

## 📂 Archivos Útiles

- `start-server.bat` - Inicia servidor (doble clic)
- `setup-firewall.ps1` - Configura firewall (Admin)
- `ACCESO_MOVIL.md` - Guía completa

---

**¡Listo para usar!** 🎉
