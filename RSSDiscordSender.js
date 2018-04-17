const RSSFeedFilter = require('./RSSFeedFilter');
const Discord = require('discord.js');

class RSSDiscordSender extends RSSFeedFilter {
  constructor(channel, filter = {}, cycleMilliseconds = 60000) {
    super(filter, cycleMilliseconds);
    this.channel = channel;
  }

}

module.exports = RSSDiscordSender;
