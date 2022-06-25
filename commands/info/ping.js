module.exports = {
  name: "ping",
  description: "Shows Bot Ping",
  run: (client, message, args) => {
    message.reply({ content: "Pong! " + client.ws.ping + "ms" });
  },
};
