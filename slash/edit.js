module.exports = {
    name: 'edit',
    description: '🎉 Bearbeite ein Giveaway',

    options: [
        {
            name: 'giveaway',
            description: 'Das zu beebdende Giveaway (message ID)',
            type: 'STRING',
            required: true
        },
        {
            name: 'duration',
            description: 'Einstellungszeit des erwähnten Giveaways. Z.B. 1h setzt das aktuelle Giveaways nach einer Stunde zu Ende!',
            type: 'STRING',
            required: true
        },
        {
            name: 'winners',
            description: 'Wie viele beim Giveaway gewinnen können',
            type: 'INTEGER',
            required: true
        },
        {
            name: 'prize',
            description: 'Was der Preis vom Giveaway ist',
            type: 'STRING',
            required: true
        }
    ],

    run: async (client, interaction) => {

        // If the member doesn't have enough permissions
        if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return interaction.reply({
                content: ':x: Du hast nicht die Berechtigung ein Giveaway zu starten.',
                ephemeral: true
            });
        }
        const gid = interaction.options.getString('giveaway');
        const time = interaction.options.getString('duration');
        const winnersCount = interaction.options.getInteger('winners');
        const prize = interaction.options.getString('prize');
        
        await interaction.deferReply({
         ephemeral: true
        })
        // Edit the giveaway
        try {
        await client.giveawaysManager.edit(gid, {
            newWinnersCount: winnersCount,
            newPrize: prize,
            addTime: time
        })
        } catch(e) {
return interaction.editReply({
            content:
                `Kein Giveaway mit dieser Message ID gefunden: \`${gid}\``,
            ephemeral: true
        });
        }
        interaction.editReply({
            content:
                `Das Giveaway wurde bearbeitet`,
            ephemeral: true
        });
    }

};
