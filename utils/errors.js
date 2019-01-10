const Discord = require("discord.js");
const fs = require("fs");
let config = require("../botconfig.json");

module.exports.noPerms = (message, perm) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setTitle("Permission insufisante")
        .setColor(config.red)
        .addField("La permission requise pour réaliser cette action est :", perm);

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.equalPerms = (message, user, perms) => {

    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor(config.red)
        .setTitle(":x:ERREUR:x:")
        .addField(`${user} a des permissions :`, perms);

    message.channel.send(embed).then(m => m.delete(5000));

}

module.exports.botuser = (message) => {
    let embed = new Discord.RichEmbed()
        .setTitle(":x:ERREUR:x:")
        .setDescription("Vous ne pouvez pas bannir un bot :sob: !")
        .setColor(config.red);

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.cantfindUser = (channel) => {
    let embed = new Discord.RichEmbed()
        .setTitle(":x:ERREUR:x:")
        .setDescription("Cet utilisateur est introuvable !")
        .setColor(config.red);

    channel.send(embed).then(m => m.delete(5000));
}

module.exports.noReason = (channel) => {
    let embed = new Discord.RichEmbed()
        .setTitle(":x:ERREUR:x:")
        .setDescription("Vous devez obligatoirement noter la raison !")
        .setColor(config.red);

    channel.send(embed).then(m => m.delete(5000));
}
