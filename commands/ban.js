const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    message.delete();
    if(!message.member.hasPermission("BAN_MEMBERS")) return errors.noPerms(message, "BAN_MEMBERS");
    if(args[0] == "help"){
      message.reply("Utilisation de la commande: .ban @pseudo <raison>");
      return;
    }
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return errors.cantfindUser(message.channel);
    if(bUser.id === bot.user.id) return errors.botuser(message);
    let bReason = args.join(" ").slice(22);
    if(!bReason) return errors.noReason(message.channel);
    if(bUser.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, bUser, "MANAGE_MESSAGES");
    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("L'utilisateur :" `${bUser}${bUser.id}`)
    .addField("A était banni par :", `<@${message.author.id}>${message.author.id}`)
    .addField("Dans le channel :", message.channel)
    .addField("Heure", message.createdAt)
    .addField("Reason", bReason);
    let incidentchannel = message.guild.channels.find(`name`, "auri");
    if(!incidentchannel) return message.channel.send("Le channel **auri** est introuvable, merci de le créer !");
    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
}

module.exports.help = {
  name:"ban"
}
