const { MessageEmbed } = require("discord.js");
const config = require("../../config");

module.exports = {
  name: "help",
  description: "Show All Of My Commands",
  run: (client, message, args) => {
    let cmds = client.commands.map((command) => command.name);

    let embed = new MessageEmbed()
      .setTitle(`My Prefix is ${config.prefix}`)
      .setColor("BLUE")
      .setDescription(`**My Commands Are:**\n\n${cmds.join("\n")}`)
      .setFooter(`${client.user.username}`);
    message.reply({ embeds: [embed] });
  },
};
