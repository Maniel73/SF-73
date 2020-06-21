const http = require('http');
const express = require('express');
const app = express();
const Discord = require('discord.js');
const fs = require('fs');
const h = require('hastebin-generator');

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/", (request, response) => {
  response.sendStatus(200);
});

app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`); 
}, 280000);


// Desde aqui empieza el bot:

const client = new Discord.Client();
client.commands = new Discord.Collection();

let prefijo = 'sf2!';

let servidor_oficial = client.guilds.cache.get('559519480934563852');

var admin = [
  '529791431682818048', // Betito 7w7
  '501828645720162324', // Kusac
  '326964927107563521', // BlueShadow
  '459462457686097930', // Agus2
  '655910249965813824' // Dios supremo
];

fs.readdir('./events', (err, files) => {
  if (err) console.error();
  files.forEach(file => {
    let evento = require(`./events/${file}`);
    let nombre = file.split(".")[0];
    client.on(nombre, (...args) => { evento.run(client, admin, prefijo, ...args) });
  });
});

fs.readdirSync('./commands').forEach(carpeta => {
  let comandos = fs.readdirSync(`./commands/${carpeta}`).filter(c => c.endsWith(".js"));
  for (let comando of comandos) {
    let cmd = require(`./commands/${carpeta}/${comando}`);
    client.commands.set(cmd.nombre, cmd);
  }
});

setInterval(() => require('./actions/lootbox.js').start(client), 1200000);

client.login(process.env.DISCORD_TOKEN)
  .then(setTimeout(() => console.log("Bot online ! \n \n"), 7000))
  .catch(err => console.error(err));