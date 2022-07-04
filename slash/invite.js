const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'invite',
    description: '➕ Lede den Bot auf deinen Server ein!',
    run: async (client, interaction) => {
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
    .setTitle("Einladungs- und Support-Link!")
    .setDescription(`Lade ${client.user} auf deine  Server ein für tolle Giveaway Funktionen`)
    .setColor('#2F3136')
    .setTimestamp()
    .setFooter(`Angefordert von ${interaction.user.username} | | Shadow Gaming| Powered by JoJoCraftDE`, interaction.user.displayAvatarURL())
    interaction.reply({ embeds: [invite], components: [row]});
}
}
