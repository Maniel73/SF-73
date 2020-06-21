const fs = require('fs');

module.exports = {
  nombre: "canal-lootbox",
  descripcion: "Modifica el canal al que se manda el lootbox",
  uso: "canal-lootbox <#canal/id>",
  categoria: "lootbox",
  args: true,
  servidor: true,
  md: false,
  admin: true,
  ejecutar: async (client, msg, args) => {
    if (!msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES')) return;
    let servidores = JSON.parse(fs.readFileSync('./databases/servidores.json', 'utf8'))
    if (!servidores[msg.guild.id]["lootbox"]) return msg.channel.send("No hay ningun lootbox creado para este servidor, para crearlo utiliza el comando `crear-lootbox` <@" + msg.author.id + ">");
    let lootbox = servidores[msg.guild.id]["lootbox"];
    var canal_id;
    if (msg.mentions.channels.first()) canal_id = msg.mentions.channels.first().id;
    else if (msg.guild.channels.cache.get(args[0])) canal_id = msg.guild.channels.cache.get(args[0]).id;
    else return msg.reply("debes mencionar un canal");
    lootbox["canal_id"] = canal_id;
    fs.writeFile('./databases/servidores.json', JSON.stringify(servidores, null, 2), (err) => {
      if (err) {
        msg.channel.send("Ha ocurrido un error");
        return console.log(err);
      }
      msg.channel.send("Se ha actualizado el canal del lootbox, para verlo escribe `lootbox` <@" + msg.author.id + ">");
    });
  }
}