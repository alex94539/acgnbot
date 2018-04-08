const RSSFeedFilter = require("./RSSFeedFilter");
﻿const Discord = require("discord.js");

class RSSDiscordSender extends RSSFeedFilter{

    constructor(channel, filter = {}, cycleMilliseconds = 60000) {
        super(filter, cycleMilliseconds);
        this.channel = channel;
    }

    addList(url) {
        this.feederList.add({
            url: url,
            refresh: this.cycleMilliseconds
        });

        setTimeout(() =>{
            this.feederList.on('new-item', function(item) {
                if (this.checkItem(item)) {
                    let message = `${item.title}
${item.description}
${item.link}`;

                    let embed = new Discord.RichEmbed()
                        .setTitle("news")
                        .setThumbnail("http://i.imgur.com/T4y0egb.jpg")
                        .setColor(3447003)
                        .addField("雪乃からの伝言", message)
                        .setFooter("比企谷雪乃")
                        .setTimestamp();
                    this.channel.sendMessage(embed);
                }
            }, this);
        }, 60000);
    }

}

module.exports = RSSDiscordSender;
