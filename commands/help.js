
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const config = require('../config.json');

module.exports.run = async (client, message, args) => {

const embed = new MessageEmbed()
.setTitle(`Befehle von ${client.user.username}`)
.setColor('#2F3136')
.setDescription('**Bitte wähle eine Kategorie aus, um alle ihre Befehle anzuzeigen**')
.setTimestamp()
.setFooter(`Powered by Shadow Gaming`, message.author.displayAvatarURL());

  const giveaway = new MessageEmbed()
  .setTitle("Kategorien » Giveaway")
  .setColor('#2F3136')
  .setDescription("```yaml\nHere are the giveaway commands:```")
  .addFields(
    { name: 'Create / Start'  , value: `Starte ein Giveaway!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
    { name: 'Edit' , value: `Bearbeite ein Giveaway!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
    { name: 'End' , value: `Beende ein Giveaway!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
    { name: 'List' , value: `Liste alle laufenden Gewinnspiele auf!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
    { name: 'Pause' , value: `Pausiere ein Giveaway!\n > **Type: __\`slash\`__**`, inline: true },
    { name: 'Reroll' , value: `Ziehe neue Gewinner für ein Gewinnspiel!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
    { name: 'Resume' , value: `Setzte ein pausiertes Gieveaway fort!\n > **Type: __\`slash\`__**`, inline: true },
  )
  .setTimestamp()
  .setFooter(`Powered by Shadow Gaming`, message.author.displayAvatarURL());


  const general = new MessageEmbed()
  .setTitle("Kategorien » General")
  .setColor('#2F3136')
  .setDescription("```yaml\nHier sind die anderen Bot Befehle:```")
  .addFields(
    { name: 'Help'  , value: `Zeigt alle verfügbaren Befehle für diesen Bot an!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
    { name: 'Invite' , value: `Lade den Bot auf deinen Server ein!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
    { name: 'Ping' , value: `Überprüfen der Websocket-Latenz des Bots (Aka Ping)!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
  )
  .setTimestamp()
  .setFooter(`Powered by Shadow Gaming`, message.author.displayAvatarURL());

  const components = (state) => [
    new MessageActionRow().addComponents(
        new MessageSelectMenu()
        .setCustomId("help-menu")
        .setPlaceholder("Wähle eine Kategorie")
        .setDisabled(state)
        .addOptions([{
                label: `Giveaways`,
                value: `giveaway`,
                description: `Sehe alle Befehle für ein Giveaway!`,
                emoji: `🎉`
            },
            {
                label: `General`,
                value: `general`,
                description: `Sehe alle anderen Befehle!`,
                emoji: `⚙`
            }
        ])
    ),
];

const initialMessage = await message.reply({ embeds: [embed], components: components(false) });

const filter = (interaction) => interaction.user.id === message.author.id;

        const collector = message.channel.createMessageComponentCollector(
            {
                filter,
                componentType: "SELECT_MENU",
                time: 300000
            });

        collector.on('collect', (interaction) => {
            if (interaction.values[0] === "giveaway") {
                interaction.update({ embeds: [giveaway], components: components(false) });
            } else if (interaction.values[0] === "general") {
                interaction.update({ embeds: [general], components: components(false) });
            }
        });
        collector.on('end', () => {
          initialMessage.edit({ components: components(true) });
      }
      )
}
