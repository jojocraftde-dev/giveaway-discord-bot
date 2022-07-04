const Discord = require('discord.js'),
  { MessageEmbed } = Discord,
  parsec = require('parsec'),
  messages = require('../utils/message');
module.exports.run = async (client, message) => {
  const collector = message.channel.createMessageCollector({
    filter: (m) => m.author.id === message.author.id,
    time: 60000,
  });

  let xembed = new MessageEmbed()
  .setTitle("Hoppla! Sieht aus, als hätten wir eine Auszeit getroffen! 🕖")
  .setColor("#FF0000")
  .setDescription('💥 Warte mal...!\nDu hast zu lange gebraucht, um dich zu entscheiden!\nVerwende erneut „Erstellen“, um ein neues Gewinnspiel zu starten!\nVersuche diesmal innerhalb von **30 Sekunden** zu antworten!')
  .setFooter(client.user.username, client.user.displayAvatarURL())
  .setTimestamp()


  function waitingEmbed(title, desc) {
    return message.channel.send({
      embeds: [
        new MessageEmbed()
          .setAuthor(
            message.author.tag + ' | Giveaway Setup',
            message.member.displayAvatarURL()
          )
          .setTitle('Giveaway ' + title)
          .setDescription(desc + ' innerhalb der nächsten 60 Sekunden.')
          .setFooter(
            "Gebe „cancel“ ein, um diesen Vorgang zu beenden.",
            client.user.displayAvatarURL()
          )
          .setTimestamp()
          .setColor('#2F3136'),
      ],
    });
  }

  let winnerCount, channel, duration, prize, cancelled;

  await waitingEmbed('Preis', 'Bitte gib den Gewinn ein');

  collector.on('collect', async (m) => {
    if (cancelled) return;

    async function failed(options, ...cancel) {
      if (typeof cancel[0] === 'boolean')
        (cancelled = true) && (await m.reply(options));
      else {
        await m.reply(
          options instanceof MessageEmbed ? { embeds: [options] } : options
        );
        return await waitingEmbed(...cancel);
      }
    }

    if (m.content === 'cancel') return await failed('Abgebrochene Giveaway-Erstellung.', true);

    switch (true) {
      case !prize: {
        if (m.content.length > 256)
          return await failed(
            'Der Preis darf nicht mehr als 256 Zeichen umfassen.',
            'Preis',
            'Bitte gib den Giveaway Preis ein'
          );
        else {
          prize = m.content;
          await waitingEmbed('Kanal', 'Bitte wählen sie den Kanal für das Gewinnspiel');
        }

        break;
      }

      case !channel: {
        if (!(_channel = m.mentions.channels.first() || m.guild.channels.cache.get(m.content)))
          return await failed(
            'Bitte gib einen gültigen Kanal ein',
            'Kanal',
            'Nutze #(Dein Kanal)'
          );
        else if (!_channel.isText())
          return await failed(
            'Der Kanal muss ein Text-Kanal sein.',
            'Kanal',
            'Bitte wähle den Giveaway Channel'
          );
        else {
          channel = _channel;
          await waitingEmbed(
            'Gewinner',
            'Bitte gib an, wie viele gewinnen können.'
          );
        }

        break;
      }

      case !winnerCount: {
        if (!(_w = parseInt(m.content)))
          return await failed(
            'Die Anzahl der Gewinner muss eine ganze Zahl sein.',

            'Gewinner',
            'Bitte gib an, wie viele gewinnen können.'
          );
        if (_w < 1)
          return await failed(
            'Anzahl der Gewinner muss höher sein als 1.',
            'Gewinner',
            'Bitte gib an, wie viele gewinnen können.'
          );
        else if (_w > 15)
          return await failed(
            'Anzahl der Gewinner muss kleiner sein als 15.',
            'Gewinner',
            'Bitte gib an, wie viele gewinnen können.'
          );
        else {
          winnerCount = _w;
          await waitingEmbed('Dauer', 'Bitte gib die Dauer an');
        }

        break;
      }

      case !duration: {
        if (!(_d = parsec(m.content).duration))
          return await failed(
            'Bitte gebe eine gültige Dauer an.',
            'Dauer',
            'Bitte gib eine gültige Dauer an'
          );
        if (_d > parsec('30d').duration)
          return await failed(
            'Dauer muss kürzer sein als 30 Tage!',
            'Dauer',
            'Bitte gebe eine gültige Dauer an'
          );
        else {
          duration = _d;
        }

        return client.giveawaysManager.start(channel, {
          prize,
          duration,
          winnerCount,
          messages,
          hostedBy: client.config.hostedBy && message.author,
        });
      }
    }
  });
  collector.on('end', (collected, reason) => {
    if (reason == 'time') {
       message.reply({ embeds: [xembed]})
    }
  })
};
