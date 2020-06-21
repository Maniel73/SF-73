const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
  nombre: "forzar-lootbox",
  descripcion: "Fuerza la aparici\u00F3n del lootbox en el servidor",
  uso: "forzar-lootbox",
  categoria: "lootbox",
  args: false,
  servidor: true,
  md: false,
  admin: true,
  ejecutar: async (client, msg, args) => {
    let servidores = JSON.parse(fs.readFileSync('./databases/servidores.json' , 'utf8'));
    msg.delete().catch(() => {return;});
    if (!servidores[msg.guild.id]["lootbox"] && msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES')) return msg.channel.send("No hay ning\u00FAn lootbox configurado en el servidor <@" + msg.author.id + ">");
    let lootbox = servidores[msg.guild.id]["lootbox"];
    let canal = msg.guild.channels.cache.get(lootbox.canal_id);
    if (!canal.permissionsFor(msg.guild.me).has('SEND_MESSAGES')) return msg.channel.send("No puedo enviar mensajes por el canal del lootbox").catch(() => { return msg.guild.owner.send(new MessageEmbed().setTitle("Error en el lootbox").setAuthor(msg.guild.name, msg.guild.iconURL()).setColor('ff8000').setDescription("No tengo permisos para mandar mensajes por <#" + canal.id + "> por favor cambie el canal o desactive los lootbox con el comando `estado-lootbox <ON/OFF>`")) });
    let filtro = m => m.content.toLowerCase() === lootbox.frase.toLowerCase();
    let ids = [];
    let mensaje = canal.send("Escribe \"SF_forever\"");
    const collector = canal.createMessageCollector(filtro, { time: lootbox.tiempo });
    collector.on('collect', m => {
      ids.push(m.author.id);
      m.react("702017403810218074").catch(() => m.react("👍"));
    });
    collector.on('end', collected => {
      mensaje.then(d_msg => d_msg.delete().catch(err => console.log(err)));
      if (!collected.size) return canal.send("Nadie particip\u00F3 :c").then(d_msg => setTimeout(() => d_msg.delete(), 6000));
      collected.forEach(c => c.delete().catch(() => {return;}));
      let ganador = msg.guild.members.cache.get(ids[Math.floor(Math.random() * ids.length)]).user;
      canal.send(`El ganador es <@${ganador.id}>, ƑelicidadeS͓̽ !!!`).then(d_msg => setTimeout(() => d_msg.delete(), 6000));
    });
  }
}