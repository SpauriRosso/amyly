const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Information sur le serveur")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Nom du serveur :", message.guild.name)
    .addField("Server créer le :", message.guild.createdAt)
    .addField("Vous êtes arrivé le :", message.member.joinedAt)
    .addField("Totam des membres :", message.guild.memberCount);

    message.channel.send(serverembed);
}

module.exports.help = {
  name:"serv"
}
