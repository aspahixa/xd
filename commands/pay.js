const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (client, message, args) => {


  let user = message.mentions.users.first();

  let money = await db.fetch(`money_${message.guild.id}_${message.author.id}`);

  let embed1 = new Discord.MessageEmbed()
    .setColor("#4CAAFF")
    .setDescription(` **__Označi člana__** kojem želiš dati novac!`);

  if (!user) {
    return message.channel.send(embed1);
  }

  if (user.bot) return message.channel.send("Ne možeš dati novac botu!");

  if (message.author === user)
    return message.channel.send("Ne možeš sebi platiti!");

  let member = message.guild.members.cache.get(user.id);

  let embed2 = new Discord.MessageEmbed()
    .setColor("#4CAAFF")
    .setDescription(` Napiši iznos novca sa kojim želiš platiti!`);

  if (!args[1]) {
    return message.channel.send(embed2);
  }
  let embed3 = new Discord.MessageEmbed()
    .setColor("#4CAAFF")
    .setDescription(
      ` Ne možeš platiti negativan novac!`
    );

  if (message.content.includes("-")) {
    return message.channel.send(embed3);
  }
  let embed4 = new Discord.MessageEmbed()
    .setColor("#4CAAFF")
    .setDescription(` Nemaš toliko novca!`);

  if (money < args[1]) {
    return message.channel.send(embed4);
  }
  let embed5 = new Discord.MessageEmbed()
    .setColor("#4CAAFF")
    .setDescription("<:Ne:720248651485544508> **__Ne možeš platiti sa manje od 1$!__**");

  if (args[1] == 0) {
    return message.channel.send(embed5);
  }
  let embed6 = new Discord.MessageEmbed()
    .setColor("#4CAAFF")
    .setDescription(
      "<:Ne:720248651485544508> Ne možeš koristiti znakove!"
    );

  if (args[1] != Number(args[1])) {
    return message.channel.send(embed6);
  }
  let embed7 = new Discord.MessageEmbed()
    .setColor("#4CAAFF")
    .setDescription(
      `<:Da:720248621701791805> Platio/la si ${user.username} ${args[1]}$`
    );

  message.channel.send(embed7);
  db.add(`money_${message.guild.id}_${user.id}`, Number(args[1]));
  db.subtract(
    `money_${message.guild.id}_${message.author.id}`,
    Number(args[1])
  );
};
exports.help = {
  name: "pay",
  description: "plaćanje članovima",
  usage: "pay [@mention] [iznos]",
  category: "economy",
  listed: true
};
