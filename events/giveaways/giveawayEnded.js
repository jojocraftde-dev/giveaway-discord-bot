const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, winners) {
    winners.forEach((member) => {
      member.send({
        embeds: [new Discord.MessageEmbed()
          .setTitle(`🎁 Los gehts!`)
          .setColor("#2F3136")
          .setDescription(`Hey ${member.user}\n Ich habe gehört, dass du **[[dieses Giveaway gewonnen hast]](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})**\n Herzlichen Glückwunsch! :tada: **${giveaway.prize}!**\nSenden Sie eine Direktnachricht an **JoJoCraftDE#1488*, um den Preis zu erhalten!!`)
          .setTimestamp()
          .setFooter(member.user.username, member.user.displayAvatarURL())
        ]
      }).catch(e => {})
    });

  }
}