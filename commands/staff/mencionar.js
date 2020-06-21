const sf = '559519480934563852';
const roles = ['700470202344669284', '700475422659575878', '631444284322873364', '712352245764718593'];

module.exports = {
  nombre: "mencionar",
  descripcion: "Menciona un rol",
  uso: "mencionar <id>",
  categoria: "staff",
  args: true,
  servidor: true,
  md: false,
  admin: false,
  ejecutar: async (client, msg, args, admin) => {
    const servidor_oficial = client.guilds.cache.get(sf);
    const staff_alianzas = msg.guild.members.cache.filter(m => roles.some(id => m.roles.cache.has(id))).map(x => x.user.id);
    let role = args.shift().toLowerCase();
    switch (role) {
      case 'creador':
        msg.channel.send(`El creador del bot es: <@655910249965813824>`);
        msg.delete().catch(() => {return;});
        break;
      case 'partner':
        if (msg.guild.id !== servidor_oficial.id) return msg.reply('debes poner la ID de un rol');
        let permisos = admin.concat(staff_alianzas);
        if (!permisos.some(id => id == msg.author.id) && msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES')) return msg.reply('este comando es solo para administradores, lo siento').then(d_msg => setTimeout(() => d_msg.delete(), 6000));
        if (!msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES')) return msg.author.send("No tengo permisos para mandar mensajes por ese canal");
        let rol_m = msg.guild.roles.cache.get('572589334113288212');
        if (msg.guild.me.hasPermission('MENTION_EVERYONE')) {
          msg.channel.send(`<@&${rol_m}>`);
          msg.delete().catch(() => msg.author.send('No tengo permisos para borrarte el mensaje, b\u00F3rralo tu del canal <#' + msg.channel.id + '>'));
          return;
        }
        if (rol_m.mentionable) { 
          msg.channel.send(`<@&${rol_m.id}>`);
          msg.delete().catch(() => msg.author.send('No tengo permisos para borrarte el mensaje, b\u00F3rralo tu del canal <#' + msg.channel.id + '>'));
          return;
        }
        rol_m.mentionable = true;
        msg.channel.send(`<@&${rol_m.id}>`);
        rol_m.mentionable = false;
        msg.delete().catch(() => msg.author.send('No tengo permisos para borrarte el mensaje, b\u00F3rralo tu del canal <#' + msg.channel.id + '>'));
        break;
      default:
        if ((!admin.some(id => id == msg.author.id) && msg.guild.id === servidor_oficial.id) || msg.member.hasPermission('ADMINISTRATOR') && msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES')) return msg.reply('este comando es solo para administradores, lo siento').then(d_msg => setTimeout(() => d_msg.delete(), 6000));
        if (!msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES')) return msg.author.send("No tengo permisos para mandar mensajes por ese canal");
        let rol = msg.guild.roles.cache.get(role);
        if (!rol) return msg.reply('debes poner la ID de un rol');
        if (msg.guild.me.hasPermission('MENTION_EVERYONE')) {
          msg.channel.send(`<@&${rol_m}>`);
          msg.delete().catch(() => msg.author.send('No tengo permisos para borrarte el mensaje, b\u00F3rralo tu del canal <#' + msg.channel.id + '>'));
          return;
        }
        if (rol.mentionable) { 
          msg.channel.send(`<@&${rol.id}>`);
          msg.delete().catch(() => msg.author.send('No tengo permisos para borrarte el mensaje, b\u00F3rralo tu del canal <#' + msg.channel.id + '>'));
          return;
        }
        rol.mentionable = true;
        msg.channel.send(`<@&${rol.id}>`);
        rol.mentionable = false;
        msg.delete().catch(() => msg.author.send('No tengo permisos para borrarte el mensaje, b\u00F3rralo tu del canal <#' + msg.channel.id + '>'));
    }
  }
}