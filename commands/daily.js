const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

exports.run = async (client, message, args) => {


  let user = message.author;

  let timeout = 86400000;
  let amount = 500;

  let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));

    let timeEmbed = new Discord.MessageEmbed()
      .setColor("#4CAAFF")
      .setDescription(
        ` Već si sakupio/la dnevnu nagradu!\n\nMožeš je opet sakupiti za ${time.hours}h ${time.minutes}m ${time.seconds}s `
      );
    message.channel.send(timeEmbed);
  } else {
    let moneyEmbed = new Discord.MessageEmbed()
      .setColor("#4CAAFF")
      .setDescription(`**__Uspešno__** si sakupio/la dnevnu nagradu od ${amount}$`);
    message.channel.send(moneyEmbed);
    db.add(`money_${message.guild.id}_${user.id}`, amount);
    db.set(`daily_${message.guild.id}_${user.id}`, Date.now());
  }
};
exports.help = {
  name: "daily",
  description: "dnevna nagrada",
  usage: "daily",
  category: "economy",
  listed: true
};
