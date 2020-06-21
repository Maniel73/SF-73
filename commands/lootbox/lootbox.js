const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
  nombre: "lootbox",
  descripcion: "Muestra la configuraci\u00F3n del lootbox",
  uso: "lootbox",
  categoria: "lootbox",
  args: false,
  servidor: true,
  md: false,
  admin: false,
  ejecutar: async (client, msg, args) => {
    if (!msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES')) return;
    let servidores = JSON.parse(fs.readFileSync('./databases/servidores.json', 'utf8'));
    if (!servidores[msg.guild.id]["lootbox"]) return msg.channel.send("No hay ning\u00FAn lootbox creado para este servidor, para crearlo utiliza el comando `crear-lootbox` <@" + msg.author.id + ">");
    let lootbox = servidores[msg.guild.id]["lootbox"];
    let canal_id = lootbox.canal_id;
    let frase = lootbox.frase;
    let tiempo = lootbox.tiempo
    var estado;
    
    if (lootbox["activo"]) estado = 'ON'; else estado = 'OFF';
    msg.channel.send(new MessageEmbed()
                       .setTitle("Lootbox")
                       .setAuthor(msg.guild.name, msg.guild.iconURL())
                       .setColor('ff8000')
                       .addField('Estado:', estado, true)
                       .addField('Canal:', `<#${canal_id}>`, true)
                       .addField('Frase:', frase, true)
                       .addField('Tiempo para escribir la frase:', `${tiempo / 1000} segundos`));
  }
}