const discord = require("discord.js");
const fs = require("fs");
const { projectsLimt, prefix } = require("../../config");
const send = require("../../functions");

module.exports = {
  name: "monitor",
  aliases: ["add"],
  run: async (client, message, args) => {
    if (!args[0]) {
      return send("Please give website link to monitor", message, "RED");
    }
    if (!isURL(args[0])) {
      return send(
        "Given Url is invalid, Make sure you send working URL",
        message,
        "RED"
      );
    }
    let database = JSON.parse(fs.readFileSync("./link.json", "utf8"));
    const check = database.find((x) => x.id === message.author.id);

    if (check) {
      if (check.link.length === `${projectsLimt}`) {
        return send(
          "You reached your limit, you can not add more than" +
            projectsLimt +
            " website.",
          message,
          "RED"
        );
      }

      let numb = database.indexOf(check);
      database[numb].link.push(args[0]);
    } else {
      database.push({
        id: message.author.id,
        name: message.author.username,
        link: [args[0]],
      });
    }

    fs.writeFile("./link.json", JSON.stringify(database, null, 2), (err) => {
      if (err) console.log(err);
    });

    send(
      "Added Your Website to monitoring use " +
        prefix +
        " stats To View Your Monitoring Links",
      message,
      "YELLOW"
    );
  },
};

function isURL(url) {
  if (!url) return false;
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))|" +
      "localhost" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return pattern.test(url);
}
