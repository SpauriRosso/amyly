const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Mes information **Personnel**")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Je m'appel :", bot.user.username)
    .addField("Ma date de naissance est :", bot.user.createdAt)
    .addField("La personne qui m'a codé est : SpyRisk9#2089");

    message.channel.send(botembed);
}

module.exports.help = {
  name:"info"
}
