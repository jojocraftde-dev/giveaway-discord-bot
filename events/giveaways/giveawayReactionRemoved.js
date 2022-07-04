const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, member) {
    return member.send({
      embeds: [new Discord.MessageEmbed()
        .setTimestamp()
        .setTitle('❓ Warte mal...')
        .setColor("#2F3136")
        .setDescription(
          `Dein Eintrag für [dieses Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) wurde aufgenommen, aber du hast nicht reagiert, für **${giveaway.prize}** Ich muss mir wohl jemand anderen aussuchen 😭`
        )
        .setFooter("Du glaubst das war ein Versehen? Reagire einfach nochmal!")
      ]
    }).catch(e => {})

  }
}