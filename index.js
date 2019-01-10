//Fichier de confisuration du bot
const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
//Declaration de Discord + autre const
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
//Declaration de "fs" => Lecture de fichier / dossier
fs.readdir("./commands/", (err, files) => {
  //Si erreur alors => consol.log; (seulement ligne 12)
  if(err) console.log(err);
  //Instruction de lecture des fichier d'extention js
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.lenght <= 0) {
    console.log("Le dossier 'commands' est introuvable !");
    return;
  }
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} est chargé avec succés !`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} est connecter à ${bot.guilds.size} serveurs !`);
  bot.user.setActivity("www.aurirp.ml", {type:"PLAYING", url:"http://aurirp.ml"});
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

});

bot.login(tokenfile.token);

//++Ajouter cmd 'help' ici++//

bot.login(tokenfile.token);
