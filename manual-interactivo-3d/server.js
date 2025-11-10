const { spawn } = require('child_process');
const os = require('os');

// Obtener todas las direcciones IP de red
function getNetworkIPs() {
  const interfaces = os.networkInterfaces();
  const ips = [];
  
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Ignorar direcciones internas y IPv6
      if (iface.family === 'IPv4' && !iface.internal) {
        ips.push({
          name: name,
          address: iface.address
        });
      }
    }
  }
  
  return ips;
}

const PORT = 3001;
const networkIPs = getNetworkIPs();

console.log('\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🚀 SERVIDOR NEXT.JS INICIANDO...');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('\n📱 ACCESO DESDE DISPOSITIVOS:\n');
console.log(`  🖥️  Local:        http://localhost:${PORT}`);
console.log(`  🌐 En esta PC:    http://127.0.0.1:${PORT}`);

if (networkIPs.length > 0) {
  console.log('\n  📱 DESDE TU MÓVIL/TABLET (misma red WiFi):');
  networkIPs.forEach((ip, index) => {
    if (ip.address.startsWith('192.168') || ip.address.startsWith('10.')) {
      console.log(`  ${index === 0 ? '✨' : '  '} http://${ip.address}:${PORT}`);
    }
  });
} else {
  console.log('\n  ⚠️  No se detectaron IPs de red');
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('💡 Para acceder desde tu celular:');
console.log('   1. Conecta tu móvil al mismo WiFi');
console.log('   2. Abre el navegador');
console.log('   3. Escribe la URL de arriba ✨');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Iniciar Next.js
const next = spawn('next', ['dev', '--port', PORT.toString(), '--hostname', '0.0.0.0'], {
  stdio: 'inherit',
  shell: true
});

next.on('error', (error) => {
  console.error('❌ Error al iniciar el servidor:', error);
  process.exit(1);
});

next.on('close', (code) => {
  if (code !== 0) {
    console.log(`\n⚠️  Servidor detenido con código: ${code}`);
  }
  process.exit(code);
});

// Manejar señales de cierre
process.on('SIGINT', () => {
  console.log('\n\n👋 Deteniendo servidor...');
  next.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\n👋 Deteniendo servidor...');
  next.kill();
  process.exit(0);
});
