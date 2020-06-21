const { MessageEmbed } = require('discord.js');
const h = require('hastebin-generator');

module.exports = {
  nombre: "lista",
  descripcion: "Muestra la lista de usuarios que tienen un rol o de roles que tiene un usuario",
  uso: "lista <@usuario/@roles>",
  categoria: "admin",
  args: true,
  servidor: true,
  md: false,
  admin: true,
  ejecutar: async (client, msg, args) => {
    if (!msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES')) return;
    if (!msg.mentions.roles.first() && !msg.mentions.members.first()) return msg.reply("debes mencionar alg\u00FAn rol o usuario del servidor");
      if (msg.mentions.roles.first() && msg.mentions.members.first()) return msg.channel.send("Lo siento, no puedo hacer una lista de roles y de miembros en un solo mensaje");
      if (msg.mentions.roles.first()) {
        var rol = msg.mentions.roles.first();
        var lista = msg.guild.members.cache.filter(m => m.roles.cache.has(rol.id)).map(x => `${x.user} | ${x.user.id}`).join("\n");
      }
      else if (msg.mentions.members.first()) {
        let miembro = msg.mentions.members.first();
        var lista = miembro.roles.cache.filter(r => r.id != msg.guild.roles.everyone.id).map(x => `${x.name} | ${x.id}`).join("\n");
      }
      else return;
      if (!lista.length && rol) return msg.channel.send(new MessageEmbed().setTitle("No hay ning\u00FAn miembro con el rol").setColor("36393f"));
      else if (!lista.length) return msg.channel.send(new MessageEmbed().setTitle("Este miembro no tiene ning\u00FAn rol").setColor("36393f"));
      if(lista.length > 1985) {
        if (rol) {
          var embed = new MessageEmbed()
          .setTitle("Haz click aqu\u00ED para ver la lista")
          .setURL(await h(msg.guild.members.cache.filter(m => m.roles.cache.has(rol.id)).map(x => `${x.user.tag} | ${x.user.id}`).join("\n"), 'js'))
          .setColor("36393f");
        } else {
          var embed = new MessageEmbed()
          .setTitle("Haz click aqu\u00ED para ver la lista")
          .setURL(await h(lista, 'js'))
          .setColor("36393f");
        }
      } else {
        var embed = new MessageEmbed()
        .setColor("36393f")
        .setDescription(lista);
      }
      msg.channel.send(embed);
  }
}