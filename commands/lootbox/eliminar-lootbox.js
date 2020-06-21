const fs = require('fs');

module.exports = {
  nombre: "eliminar-lootbox",
  descripcion: "Elimina el lootbox del servidor",
  uso: "eliminar-lootbox",
  categoria: "lootbox",
  args: false,
  servidor: true,
  md: false,
  admin: true,
  ejecutar: async (client, msg, args) => {
    if (!msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES')) return;
    let servidores = JSON.parse(fs.readFileSync('./databases/servidores.json', 'utf8'));
    if (!servidores[msg.guild.id]["lootbox"]) return msg.channel.send("Primero debes crear un lootbox para este servidor, para crearlo utiliza el comando `crear-lootbox` <@" + msg.author.id + ">");
    var seguro = false;
    let filtro = m => m.author.id == msg.author.id;
    msg.channel.send("Est\u00E1s seguro de que quieres borrar el lootbox del servidor? <@" + msg.author.id + ">");
    await msg.channel.awaitMessages(filtro, { max: 1, time: 60000, errors: ['time'] }).then(collected => {
      let mensaje = collected.first().content.toUpperCase();
      if (mensaje == 'SI') return seguro = true;
      return;
    }).catch(() => {
      msg.channel.send('Has tardado demasiado en responder');
    });
    if (seguro) delete servidores[msg.guild.id]["lootbox"]; else return msg.channel.send("No se elimin\u00F3 el lootbox");
    fs.writeFile('./databases/servidores.json', JSON.stringify(servidores, null, 2), (err) => {
      if (err) {
        msg.channel.send("Ha ocurrido un error");
        return console.log(err);
      }
      msg.channel.send("Se ha eliminado el lootbox de este servidor, <@" + msg.author.id + ">");
    });
  }
}