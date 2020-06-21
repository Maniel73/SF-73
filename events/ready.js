const prefijo = 'm73!'

module.exports.run = async client => {
  client.user.setStatus('online');
  let actividades = ['En limpieza...', 'Bajando a los administradores',  'Aprendiendo matematicas', 'Convocando a los Admins G', 'Creando listas nuevas...', 'Desaparesiendo con Maniel', 'Durmiendo con Blue', 'Joteando con Kusac', 'Facheando con Agus', ];
  function estado() {
    let actividad = actividades[Math.floor(Math.random() * actividades.length)];
    client.user.setActivity(actividad, { type: "PLAYING" });
  }
  setInterval(estado, 9000);
  let maniel73 = client.users.cache.get('655910249965813824');
  function consola() {
    console.log(`+---------------+---------------+`);
    console.log(`              BOT:`);
    console.log(`Nombre del bot: ${client.user.tag}`);
    console.log(`ID del bot: ${client.user.id}`);
    console.log(`Creador: ${maniel73.tag}`);
    console.log(`ID del creador: ${maniel73.id}`)
    console.log(`Estado: ${client.user.presence.status}`);
    console.log(`+---------------+---------------+`);
    console.log(`            DISCORD:`);
    console.log(`Servidores: ${client.guilds.cache.size}`);
    console.log(`Usuarios: ${client.users.cache.size}`);
    console.log(`Canales: ${client.channels.cache.size}`);
    console.log(`Comandos: ${client.commands.size}`);
    console.log(`+---------------+---------------+`);
    console.log(`           PERMISOS:`);
    console.log(`Permisos necesarios: Administrador`);
    console.log(`+---------------+---------------+`);
  }
  console.log(`Iniciando bot...`);
  setTimeout(consola, 2000);
}