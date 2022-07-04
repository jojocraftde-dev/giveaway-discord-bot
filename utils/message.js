const config = require('../config.json');
module.exports = {
  giveaway:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "🎉 **GIVEAWAY** 🎉",
  giveawayEnded:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "🎉 **GIVEAWAY VORBEI** 🎉",
  drawing:  `Geendet: **{timestamp}**`,
  inviteToParticipate: `Reagiere mit 🎉, um mit zu feiern!`,
  winMessage: "Glückwunsch, {winners}! Du hast/ihr habt **{this.prize}** gewonnen!",
  embedFooter: "Giveaways",
  noWinner: "Gewinnspiel abgesagt, keine gültigen Teilnahmen.",
  hostedBy: "Hosted by: {this.hostedBy}",
  winners: "Gewinner",
  endedAt: "Geendet vor"
}