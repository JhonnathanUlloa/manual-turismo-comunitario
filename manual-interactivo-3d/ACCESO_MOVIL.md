# 📱 Acceso desde Dispositivos Móviles

## 🌐 Dirección de Acceso

### **Tu IP Local:** `192.168.9.104`

Accede desde cualquier dispositivo en tu red WiFi:

```
http://192.168.9.104:3001
```

---

## 🚀 Pasos para Iniciar el Servidor

### 1. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

### 2. El servidor estará disponible en:
- **PC (localhost):** http://localhost:3001
- **Móvil/Tablet:** http://192.168.9.104:3001

---

## 📋 Requisitos

✅ **Firewall de Windows configurado**
- El puerto 3001 debe estar abierto
- Ejecuta como Administrador:

```powershell
New-NetFirewallRule -DisplayName "Next.js Dev Server" -Direction Inbound -LocalPort 3001 -Protocol TCP -Action Allow
```

✅ **Misma red WiFi**
- Tu PC y el móvil deben estar en la misma red
- Verifica que ambos dispositivos estén conectados al mismo router

✅ **IP actualizada**
- Si tu IP cambia, ejecuta: `ipconfig` para obtener la nueva

---

## 🔧 Solución de Problemas

### No puedo acceder desde el móvil:

1. **Verifica que el servidor esté corriendo:**
   ```bash
   npm run dev
   ```
   Debes ver: `✓ Ready on http://0.0.0.0:3001`

2. **Verifica tu IP actual:**
   ```powershell
   ipconfig
   ```
   Busca "Dirección IPv4" en tu adaptador WiFi

3. **Desactiva temporalmente el firewall** (para probar):
   - Panel de Control → Firewall de Windows → Desactivar

4. **Verifica la conexión WiFi:**
   - Ambos dispositivos en la misma red
   - Intenta hacer ping desde el móvil a la IP de tu PC

---

## 📱 Probar en Diferentes Dispositivos

### iPhone/iPad:
- Abre Safari
- Escribe: `http://192.168.9.104:3001`

### Android:
- Abre Chrome/Firefox
- Escribe: `http://192.168.9.104:3001`

### Tablet:
- Cualquier navegador moderno
- Escribe: `http://192.168.9.104:3001`

---

## 🎯 Configuración Aplicada

```json
"scripts": {
  "dev": "next dev -p 3001 -H 0.0.0.0"
}
```

**-H 0.0.0.0:** Permite conexiones desde cualquier IP en la red
**-p 3001:** Puerto específico 3001

---

## 🔒 Seguridad

⚠️ **IMPORTANTE:**
- Solo funciona en tu red local (LAN)
- No es accesible desde Internet
- Otros dispositivos fuera de tu WiFi NO pueden acceder
- El servidor de desarrollo NO debe usarse en producción

---

## 📊 Verificar Estado

```powershell
# Ver procesos de Node corriendo
Get-Process | Where-Object { $_.ProcessName -like "*node*" }

# Ver conexiones activas en el puerto 3001
netstat -ano | findstr :3001
```

---

**Última actualización:** 5 de noviembre de 2025
**IP actual:** 192.168.9.104
