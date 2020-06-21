module.exports = {
  nombre: "help",
  descripcion: "Muestra los comandos disponibles para el bot",
  uso: "help (<comando>)",
  categoria: "everyone",
  args: true,
  servidor: true,
  md: true,
  admin: false,
  ejecutar: async (client, msg, args) => {
    if (!msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES')) return;
  }
}