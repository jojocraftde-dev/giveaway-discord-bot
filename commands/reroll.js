const ms = require('ms');
module.exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.permissions.has('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.reply(':x: Du benögist andere Rechte um das zu tun.');
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return message.reply(':x:Ups! Das ist keine gültige Nachrichten ID!');
    }

    // try to found the giveaway with prize then with ID
    let giveaway = 
    // Search with giveaway prize
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!giveaway){
        return message.reply('Konnte kein Giveaway finden `'+ args.join(' ') +'`.');
    }

    // Reroll the giveaway
    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        // Success message
        message.reply('Gewinner wurden ausgewählt!');
    })
    .catch((e) => {
        if(e.startsWith(`Das Giveaway ${giveaway.messageID} ist noch nicht zu ende.`)){
            message.reply('Dieses Giveaway läuft noch :hourglass:!');
        } else {
            console.error(e);
            message.reply(e);
        }
    });

};
