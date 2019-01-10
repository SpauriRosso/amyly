const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("KICK_MEMBERS")) return errors.noPerms(message, "KICK_MEMBERS");
    if(args[0] == "help"){
      message.reply("Utilisation de la commande : .kick @pseudo <raison>");
      return;
    }
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return errors.cantfindUser(message.channel);
    let kReason = args.join(" ").slice(22);
    if(kUser.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, kUser, "MANAGE_MESSAGES");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("L'utilisateur :", `${kUser}${kUser.id}`)
    .addField("à était expulser par :", `<@${message.author.id}>${message.author.id}`)
    .addField("Raison", kReason)
    .addField("Heure", message.createdAt)

    let kickChannel = message.guild.channels.find(`name`, "auri");
    if(!kickChannel) return message.channel.send("Le channel **auri** est introuvable !");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
}

module.exports.help = {
  name:"kick"
}
