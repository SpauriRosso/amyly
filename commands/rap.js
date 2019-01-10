const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const red = botconfig.red;
const green = botconfig.green;
const orange = botconfig.orange;
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    message.delete();
    if(args[0] == "help"){
      message.reply("Utilisation de la commande : .rap @pseudo <raison>");
      return;
    }
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return errors.cantfindUser(message.channel);
    let rreason = args.join(" ").slice(22);
    if(!rreason) return errors.noReason(message.channel);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Rapport")
    .setColor(orange)
    .addField("Un Rapport à était mis sur :", `${rUser}`)
    .addField("Par :", `${message.author}`)
    .addField("Motif :", rreason)
    .addField("Heure", message.createdAt)

    let reportschannel = message.guild.channels.find(`name`, "🤬rapport🤬");
    if(!reportschannel) return message.channel.send("channel **🤬rapport🤬** introuvable !");
    reportschannel.send(reportEmbed);

}

module.exports.help = {
  name: "rap"
}
