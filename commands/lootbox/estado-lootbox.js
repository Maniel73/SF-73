const fs = require('fs');

module.exports = {
  nombre: "estado-lootbox",
  descripcion: "Modifica el estado del lootbox (ON = activado | OFF = desactivado)",
  uso: "estado-lootbox <ON/OFF>",
  categoria: "lootbox",
  args: true,
  servidor: true,
  md: false,
  admin: true,
  ejecutar: async (client, msg, args) => {
    if (!msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES')) return;
    let servidores = JSON.parse(fs.readFileSync('./databases/servidores.json', 'utf8'));
    if (!servidores[msg.guild.id]["lootbox"]) return msg.channel.send("No hay ning\u00FAn lootbox creado para este servidor, para crearlo utiliza el comando `crear-lootbox` <@" + msg.author.id + ">");
    let lootbox = servidores[msg.guild.id]["lootbox"];
    switch (args[0].toUpperCase()) {
      case 'ON':
        lootbox.activo = true;
        break;
      case 'OFF':
        lootbox.activo = false;
        break;
      default:
        return msg.reply("debes indicar si deseas activar o desactivar el lootbox en el servidor"); 
    }
    fs.writeFile('./databases/servidores.json', JSON.stringify(servidores, null, 2), (err) => {
      if (err) {
        msg.channel.send("Ha ocurrido un error");
        return console.log(err);
      }
      msg.channel.send("Se ha actualizado el estado del lootbox, para verlo escribe `lootbox` <@" + msg.author.id + ">");
    });
  }
}