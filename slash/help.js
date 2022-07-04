const { MessageEmbed , MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports = {
    name: 'help',
    description: '📜 Alle verfügbaren Commands von diesem Bot',
    run: async (client, interaction) => {
        const embed = new MessageEmbed()
        .setTitle(`Befehle von ${client.user.username}`)
        .setColor('#2F3136')
        .setDescription('**Bitte wähle eine Kategorie aus**')
        .setTimestamp()
        .setFooter('Powered by JoJoCraftDE#1844');
        
          const giveaway = new MessageEmbed()
          .setTitle("Kategorien » Giveaway")
          .setColor('#2F3136')
          .setDescription("```yaml\nHier sind die Giveaway Befehle:```")
          .addFields(
            { name: 'Create / Start'  , value: `Starte ein Gewinnspiel auf deinem Server\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
            { name: 'Edit' , value: `Bearbeite ein bereits laufendes Giveaway!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
            { name: 'End' , value: `Beende ein laufendes Giveaway!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
            { name: 'List' , value: `Zeigt alle laufenden Giveaways auf!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
            { name: 'Pause' , value: `Pausiere ein Giveaway!\n > **Type: __\`slash\`__**`, inline: true },
            { name: 'Reroll' , value: `Ziehe einen neuen Gewinner!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
            { name: 'Resume' , value: `Setze ein pausiertes Giveaway fort!\n > **Type: __\`slash\`__**`, inline: true },
          )
          .setTimestamp()
          .setFooter(`Angefordert von ${interaction.user.username} | | Shadow Gaming| Powered by JoJoCraftDE`, interaction.user.displayAvatarURL());
        
        
          const general = new MessageEmbed()
          .setTitle("Kategoriens » General")
          .setColor('#2F3136')
          .setDescription("```yaml\nHier sind die generellen Bot Befehle:```")
          .addFields(
            { name: 'Help'  , value: `Zeigt alle verfügbaren Befehle für diesen Bot!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
            { name: 'Invite' , value: `Lade den Bot ein!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
            { name: 'Ping' , value: `Teste den Ping vom Bot!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
          )
          .setTimestamp()
          .setFooter(`Angefordert von ${interaction.user.username} | | Shadow Gaming| Powered by JoJoCraftDE`, interaction.user.displayAvatarURL());
        
          const components = (state) => [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                .setCustomId("help-menu")
                .setPlaceholder("Wähle eine Kategorie")
                .setDisabled(state)
                .addOptions([{
                        label: `Giveaways`,
                        value: `giveaway`,
                        description: `Sehe alle Giveaway Commands`,
                        emoji: `🎉`
                    },
                    {
                        label: `General`,
                        value: `general`,
                        description: `Sieh die die allgemeinen Bot-Befehle an!`,
                        emoji: `⚙`
                    }
                ])
            ),
        ];
        
        const initialMessage = await interaction.reply({ embeds: [embed], components: components(false) });
        
        const filter = (interaction) => interaction.user.id === interaction.member.id;
        
                const collector = interaction.channel.createMessageComponentCollector(
                    {
                        filter,
                        componentType: "SELECT_MENU",
                        time: 3000000
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
    },
};