const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
  nombre: "crear-lootbox",
  descripcion: "Permite la aparici\u00F3n de lootbox dentro del servidor",
  uso: "crear-lootbox <ON/OFF> <#canal/id>",
  categoria: "lootbox",
  args: true,
  servidor: true,
  md: false,
  admin: true,
  ejecutar: async (client, msg, args) => {
    if (!msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES')) return;
    let servidores = JSON.parse(fs.readFileSync('./databases/servidores.json', 'utf8'));
    if (servidores[msg.guild.id]["lootbox"]) return msg.channel.send("El lootbox ya ha sido creado en este servidor, para verlo usa el comando `lootbox` <@"+ msg.author.id +">");
    
    var activo;
    switch (args[0].toUpperCase()) {
      case 'ON':
        activo = true;
        break;
      case 'OFF':
        activo = false;
        break;
      default:
        return msg.reply("debes indicar si deseas activar el lootbox en el servidor");
    }
    
    var canal_id;
    if (msg.mentions.channels.first()) canal_id = msg.mentions.channels.first().id;
    else if (msg.guild.channels.cache.get(args[1])) canal_id = msg.guild.channels.cache.get(args[1]).id;
    else return msg.reply("debes indicar en que canal quieres que se mande el lootbox");
    
    // if (!msg.guild.channels.cache.get(canal_id).permissionsFor(msg.guild.me).has('VIEW_CHANNEL')) return msg.reply("no puedo ver ese canal, elige otro por favor");
    if (!msg.guild.channels.cache.get(canal_id).permissionsFor(msg.guild.me).has('SEND_MESSAGES')) return msg.reply("no puedo mandar mensajes por ese canal, elige otro por favor");
    
    if (!servidores[msg.guild.id]) servidores[msg.guild.id] = {};
    let servidor = servidores[msg.guild.id];
    let obj = {
      "activo": activo,
      "canal_id": canal_id,
      "frase": "SF_forever",
      "tiempo": 8000
    };
    servidor["lootbox"] = obj;
    console.log(JSON.stringify(servidores, null, 2));
    fs.writeFile('./databases/servidores.json', JSON.stringify(servidores, null, 2), (err) => { 
      if (err) {
        msg.channel.send("Ha ocurrido un error");
        return console.log(err);
      }
      var estado;
      if (activo) estado = 'ON'; else estado = 'OFF';
      msg.channel.send(new MessageEmbed()
                       .setTitle("Lootbox")
                       .setAuthor(msg.guild.name, msg.guild.iconURL(), 'https://discord.gg/gzSbbSm')
                       .setColor('ff8000')
                       .addField('Estado:', estado, true)
                       .addField('Canal:', `<#${canal_id}>`, true)
                       .addField('Frase:', obj.frase, true)
                       .addField('Tiempo para escribir la frase:', `${obj.tiempo / 1000} segundos`));
    });
  }
}