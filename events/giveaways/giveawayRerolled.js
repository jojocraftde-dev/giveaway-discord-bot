const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, winners) {
    winners.forEach((member) => {
      member.send({
        embeds: [new Discord.MessageEmbed()
          .setTitle(`🎁 Wir haben einen neuen Gewinner`)
          .setColor("#2F3136")
          .setDescription(`Hey ${member.user}\n Ich habe gehört, das der Sponsor neu gezogen hat und du hast **[[dieses Giveaway]](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})**\n gewonnen **${giveaway.prize}!**\nKontaktiere das Team um deinen Preis zu erhalten`)
          .setTimestamp()
          .setFooter(member.user.username, member.user.displayAvatarURL())
        ]
      }).catch(e => {})
    });
  }
}