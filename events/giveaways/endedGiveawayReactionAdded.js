const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, member, reaction){
     reaction.users.remove(member.user);
  member.send(`**Oh warte mal! Sieht so aus, als wäre das Gewinnspiel bereits beendet!**`).catch(e => {})
  }
}