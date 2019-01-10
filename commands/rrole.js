const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("MANAGE_ROLES")) return errors.noPerms(message, "MANAGE_ROLES");
  if(args[0] == "help"){
    message.reply("Usage: .rrole @pseudo <role>");
    return;
  }
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("L'utilisateur est introuvable.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Vous devez spécifier un role !");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Ce role est introuvable.");

  if(!rMember.roles.has(gRole.id)) return message.reply("Cet utilisateur n'a pas ce role.");
  await(rMember.removeRole(gRole.id));

  try{
    await rMember.send(`Le role ${gRole.name} vous a était retirer !`)
  }catch(e){
    message.channel.send(`<@${rMember.id}>, Le role ${gRole.name} vous a était retirer !`)
  }
}

module.exports.help = {
  name: "rrole"
}
