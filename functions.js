const { MessageEmbed } = require("discord.js");

const send = (content, message, color) => {
  if (!color) return;

  const embed = new MessageEmbed().setDescription(content).setColor(color);

  return message.reply({ embeds: [embed] });
};

module.exports = send;
