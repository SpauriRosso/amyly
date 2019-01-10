const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
  //Ex comd => !role @SpyRisk9#2089 cheer*5
  if(!message.member.hasPermission("MANAGE_ROLE")) return errors.noPerms(message, "MANAGE_ROLE");
  if(args[0] === "help") {
    message.reply("Utilisation de la commande : `.role @pseudo <role>`");
    return;
  }
  let rMember = message.guild.member(message.mention.user.first()) || message.guild.member.get(args[0]);
  if(!rMember) return errors.cantfindUser(message.channel);
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Vous devez mentionner un rôle !");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Ce rôle est introuvable !");
  if(rMember.role.has(gRole.id)) return message.reply("L'utilisateur à déjâ ce rôle !");
  await (rMember.addRole(gRole.id));
  try {
    await rMember.send(`Excuse moi du dérangement je suis Auri du serveur Auri RolePlay, je voulais juste vous avertir que le rôle ${gRole.name} vous a était assigner ! A bientôt sur AuriRP !`)
  } catch (e) {
    console.Log(e.stack);
    message.channel.send(`<@${rMember.id} Le rôle ${gRole.name} vous a était assigner, Pensez à verifier vos paramétres car je n'ai pas réussi à vous envoyer de message !`)
  }
}

module.exports.help = {
  name: "role"
}
