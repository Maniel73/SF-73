module.exports.run = (client, admin, prefijo, msg) => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefijo)) return;
  let args = msg.content.substring(prefijo.length).split(/ +/);
  let cmmd = args.shift().toLowerCase();
  let cmd = client.commands.get(cmmd);
  if (!cmd) return;
  if (cmd.admin && (!admin.some(id => id == msg.author.id) && (msg.guild && !msg.member.hasPermission('ADMINISTRATOR'))) && (msg.guild && msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES'))) return msg.reply('este comando es solo para administradores').then(d_msg => setTimeout(() => d_msg.delete(), 8000));
  if (cmd.args && !args.length && (msg.guild && msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES'))) return msg.channel.send(`El formato correcto del comando es: \n \`${prefijo}${cmd.uso}\` \n \n <@${msg.author.id}>`).then(d_msg => setTimeout(() => d_msg.delete(), 8000));
  if ((!cmd.servidor || !cmd.md) && ((!cmd.servidor && msg.guild) || (!cmd.md && !msg.guild)) && (msg.guild && msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES'))) return msg.reply('no puedo usar el comando aqui').then(d_msg => setTimeout(() => d_msg.delete(), 8000));
  cmd.ejecutar(client, msg, args, admin);
}