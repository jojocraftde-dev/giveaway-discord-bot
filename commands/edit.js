module.exports.run = async (client, message) => {
  const Discord = require("discord.js");
  const ms = require("ms");
  let time = "";
  let winnersCount;
  let prize = "";
  let giveawayx = "";
  let embed = new Discord.MessageEmbed()
    .setTitle("Bearbeite ein Giveaway")
    .setColor('#2F3136')
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp();
  const msg = await message.reply({
    embeds:
      [embed.setDescription(
        "Welches Giveaway willst du bearbeiten?\nGib die ID- vom Giveaway an\n **Bitte antworte innerhalb von 30 Sekunden :hourglass:!**"
      )]
  }
  );
  let xembed = new Discord.MessageEmbed()
    .setTitle("Ups... Sieht so aus als wärst du zu langsam 🕖")
    .setColor("#FF0000")
    .setDescription('💥 YDu hast zu lange gebraucht!\nNutze ``edit`` um das Giveaway zu bearbeiten!\nVersuche diesmal innerhalb von **30 Sekunden** zu antworten!')
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp();

  const filter = m => m.author.id === message.author.id && !m.author.bot;
  const collector = await message.channel.createMessageCollector(filter, {
    max: 3,
    time: 30000
  });

  collector.on("collect", async collect => {

    const response = collect.content;
    let gid = BigInt(response).toString()
    await collect.delete()
    if (!gid) {
      return msg.edit({
        embeds: [
          embed.setDescription(
            "Oh je! Anscheinend ist dies eine ungültige ID\n**Erneut versuchen??**\n Beispiel: ``677813783523098627``"
          )]
      }
      );
    } else {
      collector.stop(
        msg.edit({
          embeds: [
            embed.setDescription(
              `>>> In Ordnung! Als nächstes, was wäre unsere neue Zeit für das Ende des Giveawayss \n**Antworte innerhalb von 30 Sekunden!**`
            )]
        }
        )
      );
    }
    const collector2 = await message.channel.createMessageCollector(filter, {
      max: 3,
      time: 30000
    });
    collector2.on("collect", async collect2 => {

      let mss = ms(collect2.content);
      await collect2.delete()
      if (!mss) {
        return msg.edit({
          embeds: [
            embed.setDescription(
              "Na warte mal! Das ist keine gültige Zeitangabe\n**Try Again?**\n Example: ``-10 minutes``,``-10m``,``-10``\n **Note: - (minus) Inidicates you want to reduce the time!**"
            )]
        }
        );
      } else {
        time = mss;
        collector2.stop(
          msg.edit({
            embeds: [
              embed.setDescription(
                `In Ordnung! Als nächstes, wie viele Gewinner soll ich jetzt für das Giveaway auswählen??\n**Antworte bitte innerhalb von 30 Sekunden.**`
              )]
          }
          )
        );
      }
      const collector3 = await message.channel.createMessageCollector(filter, {
        max: 3,
        time: 30000,
        errors: ['time']
      });
      collector3.on("collect", async collect3 => {

        const response3 = collect3.content.toLowerCase();
        await collect3.delete()
        if (parseInt(response3) < 1 || isNaN(parseInt(response3))) {
          return msg.edit({
            embeds: [
              embed.setDescription(
                "Augenblick mal! Gewinner müssen eine Zahl oder größer als eins sein!\n Example ``1``,``10``, etc."
              )]
          }
          );
        } else {
          winnersCount = parseInt(response3);
          collector3.stop(
            msg.edit({
              embeds: [
                embed.setDescription(
                  `In Ordnung! Als nächstes, Was sollte der neue Preis für das Giveaway sein?`
                )]
            }
            )
          );
        }
        const collector4 = await message.channel.createMessageCollector(
          filter,
          { max: 3, time: 30000 }
        );
        collector4.on("collect", async collect4 => {

          const response4 = collect4.content.toLowerCase();
          prize = response4;
          await collect4.delete()
          collector4.stop(
            console.log(giveawayx),
            msg.edit({
              embeds: [
                embed.setDescription(
                  `Edited`
                )]
            }
            )
          );
          client.giveawaysManager.edit(gid, {
            newWinnersCount: winnersCount,
            newPrize: prize,
            addTime: time
          })
        });
      });
    });
  });
  collector.on('end', (collected, reason) => {
    if (reason == 'time') {
      message.reply({ embeds: [xembed] });
    }
  })
  try {
    collector2.on('end', (collected, reason) => {
      if (reason == 'time') {

        message.reply({ embeds: [xembed] });
      }
    });
    collector3.on('end', (collected, reason) => {
      if (reason == 'time') {
        message.reply({ embeds: [xembed] });

      }
    })
    collector4.on('end', (collected, reason) => {
      if (reason == 'time') {

        message.reply({ embeds: [xembed] });
      }
    })
  } catch (e) { }
}
