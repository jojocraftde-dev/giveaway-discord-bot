const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setLabel(`Invite ${client.user.username}`)
        .setStyle('LINK')
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`),
        new MessageButton()
        .setLabel('Support Server')
        .setStyle('LINK')
        .setURL("https://discord.gg/EEk44ghvV3"),
    )
    let invite = new MessageEmbed()
    .setAuthor(`Invite ${client.user.username} `, client.user.avatarURL())
    .setTitle("Invite & Support Link!")
    .setDescription(`Lade ${client.user} auf deinen Server ein!`)
    .setColor('#2F3136')
    .setTimestamp()
    .setFooter(`Powered by Shadow Gaming`, message.author.displayAvatarURL())
    message.reply({ embeds: [invite], components: [row]});
}
