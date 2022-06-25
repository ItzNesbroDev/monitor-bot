const { Client, Collection } = require("discord.js");
const client = new Client({
  intents: 131071,
});
const { prefix, monitorChannel, token } = require("./config");
const ms = require("ms");
const http = require("http");
const fetch = require("node-fetch");
const discord = require("discord.js");
const fs = require("fs");
const bodyParser = require("body-parser");

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("pinging");
});

app.listen(3000, () => {
  console.log("server started");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  if (!message.content.startsWith(prefix)) return;

  if (monitorChannel) {
    if (message.channel != message.guild.channels.cache.get(monitorChannel))
      return message.reply({
        content: `This command can only be used in <#${monitorChannel}>`,
      });
  }

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);

  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (!command) return;
  if (command) command.run(client, message, args);
});

app.use(bodyParser.json());

let count = 0;
let invcount = 0;
let user = 0;
let rounds = 0;

setInterval(function () {
  let database = JSON.parse(fs.readFileSync("./link.json", "utf8"));
  count = 0;
  invcount = 0;
  user = database.length;
  rounds++;

  database.forEach((m) => {
    m.link.forEach((s) => {
      count++;

      fetch(s).catch((err) => {
        invcount++;
      });
    });
  });
  console.log("Interval :)");
  client.user.setActivity(`${prefix}help | Made By ItzNesbro`);
}, 240000);

app.get("/", async (request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end(
    `Monitoring ${count} websites and ${invcount} Invalid website with ${user} Users, Fetch Number : ${rounds}`
  );
});

client.on("ready", async () => {
  client.user.setActivity(`${prefix}help | Made By ItzNesbro`);
  console.log("Ready To ping Every Single bot");
});

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

client.login(token);
