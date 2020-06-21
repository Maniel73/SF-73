const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports.start = async client => {
  let servidores = JSON.parse(fs.readFileSync('./databases/servidores.json', 'utf8'));
  client.guilds.cache.forEach(s => {
    if (!servidores[s.id]["lootbox"]) return;
    let lootbox = servidores[s.id]["lootbox"];
    let canal = s.channels.cache.get(lootbox.canal_id);
    if (!canal.permissionsFor(s.me).has('SEND_MESSAGES')) return s.owner.send(new MessageEmbed().setTitle("Error en el lootbox").setAuthor(s.name, s.iconURL()).setColor('ff8000').setDescription("No tengo permisos para mandar mensajes por <#" + canal.id + "> por favor cambie el canal o desactive los lootbox con el comando `estado-lootbox <ON/OFF>`"));
    let filtro = m => m.content.toLowerCase() === lootbox.frase.toLowerCase();
    let ids = [];
    var ganador;
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
      ganador = s.members.cache.get(ids[Math.floor(Math.random() * ids.length)]).user;
      canal.send(`El ganador es <@${ganador.id}>, ƑelicidadeS͓̽ !!!`).then(d_msg => setTimeout(() => d_msg.delete(), 6000));
    });
    
    // Aqui va el premio
    
  });
  console.log("Lootbox funcionando !!!")
}