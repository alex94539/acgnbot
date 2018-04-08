const Discord = require("discord.js");

const logger = require('winston');

const auth = require('./auth.json');

const client = new Discord.Client({ autoReconnect: true });

const mail = require("nodemailer");

const express = require("express");

const webpage = express();

const http = require("http");

const query = require("querystring");

const port = 7777;

const fs = require('fs');

const RSSDiscordSender = require('./RSSDiscordSender');

const rssSenders = [];

const update = "已新增";

client.login(auth.token);

var BotInfo, ACGN, RSSConfig;

var info;

const minNum = 0;

const transporter = mail.createTransport({
    service: 'gmail',
    auth: {
        user: 'h.k.h94539@gmail.com',
        pass: 'k486z97msd'
    }
});

const mailOptions = {
    from: 'h.k.h94539@gmail.com',
    to: 'euphokumiko.iem06@nctu.edu.tw',
    subject: 'BotInfo',
    text: 'That was easy!'
};

logger.remove(logger.transports.Console);

logger.add(logger.transports.Console, {
	colorize: true
});

webpage.listen(port, function ()
{
    console.log("running on port " + port);
});

webpage.get('/', function (req, res)
{
    let string = '';
    for (let r = 0; r < BotInfo.length; r++)
    {
        string += '<h1>' + BotInfo[r].name + '</h1>' + '\n';
        for (let y = 0; y < BotInfo[r].content.length; y++)
        {
            string += '<h3>' + BotInfo[r].content[y] + '</h3>' + '\n';
        }
    }
    res.send(string);
});

logger.level = 'debug';

var highpricetime, lowquantime, pricerefresh, help;

// 以上不解釋

function readFile()//讀取檔案
{
    BotInfo = fs.readFileSync('BotInfo.json', 'utf-8');
    ACGN = fs.readFileSync('ACGN.json', 'utf-8');
    RSSConfig = fs.readFileSync('RSSConfig.json', 'utf-8');
    BotInfo = JSON.parse(BotInfo);
    ACGN = JSON.parse(ACGN);
    RSSConfig = JSON.parse(RSSConfig);
}

function writeToFile(highpricetime, lowquantime, pricerefresh)//將文字寫入JSON
{
    ACGN[0].content = highpricetime;
    ACGN[1].content = lowquantime;
    ACGN[2].content = pricerefresh;
    fs.writeFile('ACGN.json', JSON.stringify(ACGN,null,'\t'), 'utf-8', function (err)
    {
		if(err) throw err;
		console.log('Saved!');
	});
}

function updateBotInfo(BotInfo)
{
    fs.writeFile('BotInfo.json', JSON.stringify(BotInfo, null, '\t'), 'utf-8', function (err)
    {
        if (err) throw err;
        console.log('Saved!');
    });
}

function pic(arg, channel)//骰圖片用
{
    let slag = 0;

    for (var K = 0; K < BotInfo.length; K++)
    {
        if (BotInfo[K].name === arg)
        {
            slag = 1;
            reply(3, BotInfo[K].content[random(BotInfo[K].content.length)], channel);
            break;
        }
    }

    if (slag === 0)
    {
        reply(4, BotInfo[1].content, channel);
    }
}

function save(type, context, user, channel)//寫入資訊的前置作業
{
    readFile();

    if (detect(user))
    {
        return;
    }

    type = type.toLowerCase();

    switch (type)
    {
        case 'a':

            lowquantime = ACGN[1].content;

            pricerefresh = ACGN[2].content;

            writeToFile(context, lowquantime, pricerefresh);

            reply(1, BotInfo[2].content[random(BotInfo[2].content.length)],channel);

            break;

        case 'b':

            highpricetime = ACGN[0].content;

            pricerefresh = ACGN[2].content;

            writeToFile(highpricetime, context, pricerefresh);

            reply(1, BotInfo[2].content[random(BotInfo[2].content.length)],channel);

            break;

        case 'c':

            highpricetime = ACGN[0].content;

            lowquantime = ACGN[1].content;

            writeToFile(highpricetime, lowquantime, context);

            reply(1, BotInfo[2].content[random(BotInfo[2].content.length)],channel);

            break;
    }
}

function forbid(channel)//禁止的頻道
{
    if ((channel.name == "hall") || (channel.name == "lobby") || (channel.name == "plans-rule-suggestion"))
	{
		return true;
	}
}

function detect(user)//僅限某些使用者使用
{
    if ((user !== "高價釋股通知") && (user !== "papago89") && (user !== "Euphokumiko") && (user !== "低量釋股通知") && (user !== "股價更新通知"))
    {
        return true;
    }
    else
    {
        return false;
    }
}

function match(K)
{
	return K.match(/[^ ]+([\s\S]+)/)[1]; // [\s\S]+ ---> 所有字元包含換行有多少抓多少 ---> abc dddd ---> dddd
}

function reply(a, cmd, channel)//推送訊息至頻道
{
    let flag = 0;
    switch (a)
    {
        case 1://儲存指令
            embed = new Discord.RichEmbed()
                .setTitle("save message")
                .setThumbnail("http://i.imgur.com/T4y0egb.jpg")
                .setColor(3447003)
                .addField("雪乃からの伝言", cmd)
                .setFooter("比企谷雪乃")
                .setTimestamp();
            break;

        case 2://讀取指令
            embed = new Discord.RichEmbed()
                .setTitle("message")
                .setThumbnail("http://i.imgur.com/T4y0egb.jpg")
                .setColor(3447003)
                .addField("雪乃からの伝言", BotInfo[2].content[random(BotInfo[2].content.length)])
                .addField("雪乃が教えてあげる", cmd)
                .setFooter("比企谷雪乃")
                .setTimestamp();
            break;

        case 3://圖片
            embed = new Discord.RichEmbed()
                .setImage(cmd);
            break;

        case 4://say用，等待更新中
            embed = new Discord.RichEmbed()
                .setTitle("message")
                .setThumbnail("http://i.imgur.com/T4y0egb.jpg")
                .setColor(3447003)
                .addField("雪乃からの伝言", cmd)
                .setFooter("比企谷雪乃")
                .setTimestamp();
            break;

        case 5://叫人用
            embed = new Discord.RichEmbed()
                .setTitle("呼叫")
                .setThumbnail("http://i.imgur.com/T4y0egb.jpg")
                .setColor(3447003)
                .addField("雪乃が教えてあげる", cmd)
                .setFooter("比企谷雪乃")
                .setTimestamp();
            break;

        case 6:
            embed = cmd;
            flag = 1;
            break;
    }
    if (flag)
    {
        channel.send(embed);
    }
    else
    {
        channel.send({ embed });

    }
}

function random(a)//取亂數用
{
	var n = Math.floor(Math.random() * (a )) + minNum;
	return n;
}

client.on('ready', function (evt) {

	logger.info('Connected');

	logger.info('Logged in as: ');

	logger.info(client.user.username + ' - (' + client.user.id + ')');
	
	readFile();

        initRSSSenders();
});

function initRSSSenders() {
    RSSConfig.forEach((config) => {
        const channel = client.channels.get(config.channelId);
        let rssSender = new RSSDiscordSender(channel, config.filters, 60000);
        config.urlLists.forEach((url) => {
            rssSender.addList(url);
        });
        rssSenders.push(rssSender);
    });
}
client.on('message', message =>
{
    if (message.content.substring(0, 2) == '%%')
    {
		var flag = false;

		var lit = message.content.split('%%')[1]; // 將命令去除用來識別的!號 ---> !abc dddd ---> abc dddd

        var command = lit.split(/\s/)[0];// 找出命令的第一個斷點 以空白分開 ---> abc dddd ---> abc
        lit = lit.substr(command.length + 1);
        var type = lit.split(/\s/)[0];
        type = type.toLowerCase();
        var context = lit.substr(type.length + 1);
        command = command.toLowerCase();
        logger.info(`
            ${message.author.username}在${message.channel}說${message.content}
            lit = ${lit}
            command = ${command}
            type = ${type}
            context = ${context}`);
        var R, overflow;
    
        switch (command)
        {

            case 'roll':

                if (forbid(message.channel))
                {
                    break;
                }

                if (Number(context) > 11)
                {
                    reply(5, "你有病嗎？沒空幫你骰這麼多次。當我很閒？", message.channel);

                    break;
                }

                for (R = 0; R < Number(context); R++)
                {
                    pic(type, message.channel);
                }

                break;

            case 'janken'://猜拳模組,coding中

                random(3);

                break;

            case 'save':

                save(type, context, message.author.username, message.channel);

                break;

            case 'a':

                if (forbid(message.channel))
                {
                    break;
                }

                info = ACGN[0].content;

                reply(2, info, message.channel);

                break;

            case 'b':

                if (forbid(message.channel))
                {
                    break;
                }

                info = ACGN[1].content;

                reply(2, info, message.channel);

                break;

            case 'c':

                if (forbid(message.channel))
                {
                    break;
                }

                info = ACGN[2].content;

                reply(2, info, message.channel);

                break;

            case 'say':

                reply(6, type, message.channel);

                break;

            case 'eupho':

            case 'go':

                break;

            case 'help':

                if (forbid(message.channel))
                {
                    break;
                }

                var msg = '現有指令\n';

                for (let R = 0; R < BotInfo.length; R++)
                {
                    msg += BotInfo[R].name;
                    msg += '\n';
                }

                message.channel.send(msg);

                break;

            case 'setgame':

                client.user.setGame(type);

                break;

            case 'setrole':

                let myRole = message.guild.roles.find("name", context);

                let member = message.mentions.members.first();

                member.addRole(myRole).catch(console.error);

                break;

            case 'mumi':

                let det = 0;

                let stop = true;

                if (context === null)
                {
                    stop = false;
                }

                if (stop)
                {
                    for (let U = 0; U < BotInfo.length; U++)
                    {
                        if (type === BotInfo[U].name)
                        {
                            BotInfo[U].content.push(context);
                            det = 1;
                            break;
                        }
                    }
                    if (det === 0)
                    {
                        BotInfo.push({
                            "name": type,
                            "content": [
                                context
                            ]
                        });
                    }
                    updateBotInfo(BotInfo);

                    reply(6, update + type, message.channel);
                }

                break;

            case mail:



            default:

                if (forbid(message.channel))
                {
                    break;
                }

                pic(command, message.channel);

                break;
        }

	}

});

