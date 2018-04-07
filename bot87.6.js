const Discord = require("discord.js");

const logger = require('winston');

const auth = require('./auth.json');

const client = new Discord.Client({ autoReconnect: true });

var fs = require('fs');

var ACGNJSON, mumiJSON, mesJSON;

var stop;

var IDLE;

var maxNum;

var minNum = 0;

var fuck;

var message;

var contain;

const papago = "<@241938736756031498>"

const Kumiko = "<@305696867084140547>"
// Configure logger settings

logger.remove(logger.transports.Console);

logger.add(logger.transports.Console, {

	colorize: true

});

logger.level = 'debug';

// Initialize Discord Bot

var thisName = "ACGNBot";

var count, T;

var highPriceMessage, lowPriceMessage, noDealMessage, listPriceMessage, helpMessage, lowquantime, highPriceCompanyAmount;

helpMessage = "指令列：\n A = 高價釋股資訊 \n B = 低價釋股資訊 \n C = 低量釋股資訊 \n D = 股價更新資訊 \n E = 低價釋股標準 \n F = 高價釋股標準";

function writeToFile(highPriceMessage, lowPriceMessage, noDealMessage, listPriceMessage, lowquantime, highPriceCompanyAmount)
{
	ACGNJSON.highPriceMessage = highPriceMessage;
	ACGNJSON.lowPriceMessage = lowPriceMessage;
	ACGNJSON.noDealMessage = noDealMessage;
	ACGNJSON.listPriceMessage = listPriceMessage;
	ACGNJSON.lowquantime = lowquantime;
	ACGNJSON.highPriceCompanyAmount = highPriceCompanyAmount;
    fs.writeFile('ACGN', JSON.stringify(ACGNJSON,null,'\t'), 'utf-8', function (err)
    {
		if(err) throw err;
		console.log('Saved!');
	});
}

function swit(arg, cmd, user, channel)
{

    switch (arg)
    {
        case 'reload':
            readFile();

            break;
        case 'saveA':

            if (detect(user)) {
                break;
            }

            highPriceMessage = reply(1, cmd, channel);
			console.log(highPriceMessage);

            writeToFile(highPriceMessage, lowPriceMessage, noDealMessage, listPriceMessage, lowquantime, highPriceCompanyAmount);

            break;

        case 'saveB':

            if (detect(user)) {
                break;
            }

            lowPriceMessage = reply(1, cmd, channel);
            writeToFile(highPriceMessage, lowPriceMessage, noDealMessage, listPriceMessage, lowquantime, highPriceCompanyAmount);

            break;

        case 'saveC':

            if (detect(user)) {
                break;
            }

            noDealMessage = reply(1, cmd, channel);
            writeToFile(highPriceMessage, lowPriceMessage, noDealMessage, listPriceMessage, lowquantime, highPriceCompanyAmount);

            break;

        case 'saveD':

            if (detect(user)) {
                break;
            }

            listPriceMessage = reply(1, cmd, channel);
            writeToFile(highPriceMessage, lowPriceMessage, noDealMessage, listPriceMessage, lowquantime, highPriceCompanyAmount);

            break;

        case 'saveE':

            if (detect(user)) {
                break;
            }

            lowquantime = reply(1, cmd, channel);
            writeToFile(highPriceMessage, lowPriceMessage, noDealMessage, listPriceMessage, lowquantime, highPriceCompanyAmount);

            break;


        case 'saveF':

            if (detect(user)) {
                break;
            }

            highPriceCompanyAmount = reply(1, cmd, channel);
            writeToFile(highPriceMessage, lowPriceMessage, noDealMessage, listPriceMessage, lowquantime, highPriceCompanyAmount);

            break;

        case 'write':

            if (detect(user)) {
                break;
            }

            writeToFile(highPriceMessage, lowPriceMessage, noDealMessage, listPriceMessage, lowquantime, highPriceCompanyAmount);

            break;

        case 'A':

            if (forbid(channel)) {
                break;
            }

            reply(2, highPriceMessage, channel);

            flag = true;

            break;

        case 'B':

            if (forbid(channel)) {
                break;
            }

            reply(2, lowPriceMessage, channel);

            flag = true;

            break;

        case 'C':

            if (forbid(channel)) {
                break;
            }

            reply(2, noDealMessage, channel);

            flag = true;

            break;

        case 'D':

            if (forbid(channel)) {
                break;
            }

            reply(2, listPriceMessage, channel);

            flag = true;

            break;

        case 'E':

            if (forbid(channel)) {
                break;
            }

            reply(2, lowquantime, channel);

            flag = true;

            break;


        case 'F':

            if (forbid(channel)) {
                break;
            }

            reply(2, highPriceCompanyAmount, channel);

            flag = true;

            break;

        case 'help':

            if (forbid(channel)) {
                break;
            }

            reply(2, helpMessage, channel);

            flag = true;

            break;

        // Just add any case commands if you want to..

        case 'go':

            if (forbid(channel)) {
                break;
            }

            reply(5, papago + "再不出現我就閹了你:knife:", channel);

            break;

        case 'eupho':

            if (forbid(channel)) {
                break;
            }

            reply(5, Kumiko, channel);

            break;

        case 'all':

            if (forbid(channel)) {
                break;
            }

            reply(2, highPriceMessage + "\n\n" + lowPriceMessage + "\n\n" + noDealMessage + "\n\n" + listPriceMessage + "\n\n" + lowquantime + "\n\n" + highPriceCompanyAmount + "\n\n", channel);

            flag = true;

            break;

        case 'idle':

            reply(3, QAQ, channel);

            flag = true;

            break;

        case 'say':

            if (forbid(channel)) {
                break;
            }

            reply(4, cmd, channel);

            flag = true;

            break;

        case 'yuki':

            if (forbid(channel))
            {
                break;
            }
            reply(3, yuki[random(yuki.length)], channel);
                        
            flag = true;

            break;

        case 'blacklong':

            if (forbid(channel)) {
                break;
            }

            reply(3, longblack[random(longblack.length)], channel);           

            flag = true;

            break;

        case 'FGO':

            if (forbid(channel))
            {
                break;
            }
            reply(3, FGO[random(FGO.length)], channel);
            
            flag = true;

            break;

        case 'kumiko':

            if (forbid(channel))
            {
                break;
            }
            reply(3, kumiko[random(kumiko.length)], channel);

            flag = true;

            break;

        case 'software':

            if (forbid(channel)) {
                break;
            }

            reply(3, miku[random(miku.length)], channel);

            flag = true;

            break;

        case 'mumi':

            if (stop) {
                reply(5, "現在沒空，閉嘴", channel);

                break;
            }
            else {
                reply(5, "確認存入", channel);
            }

            mumi(cmd);

            break;

        case 'chino':

            if (forbid(channel)) {
                break;
            }

            reply(3, chino[random(chino.length)], channel);

            break;

        case 'clean':

            clean(cmd);

            break;

        case 'LL':

            if (forbid(channel)) {
                break;
            }
            reply(3, LoveLive[random(LoveLive.length)], channel);
            
            break;

        case 'reconnect':

            if (detect(user)) {
                break;
            }

            bot.connect();

            break;

        case 'rocket':

            if (forbid(channel)) {
                break;
            }

            reply(3, rocket[random(rocket.length)], channel);

            break;

        case 'kyoani':

            if (forbid(channel)) {
                break;
            }

            reply(3, kyoani[random(kyoani.length)], channel);

            break;

        case 'sister':

            if (forbid(channel)) {
                break;
            }

            reply(3, sister[random(sister.length)], channel);

            break;

        case 'yukino':

            if (forbid(channel)) {
                break;
            }

            reply(3, yukino[random(yukino.length)], channel);

            flag = true;

            break;

        case 'heroin':

            if (forbid(channel)) {
                break;
            }

            reply(3, heroin[random(heroin.length)], channel);

            flag = true;

            break;


        case 'break':

            if (detect(user)) {
                break;
            }

            stop = 1;

            reply(5, "存入指令關閉", channel);

            break;

        case 'continue':

            if (detect(user)) {
                break;
            }

            stop = 0;

            reply(5, "存入指令啟動", channel);

            break;
        case 'reset':

            T = 0;

            ACGNJSON.count = T;

            fs.writeFile('ACGN', JSON.stringify(ACGNJSON, null, '\t'), 'utf-8', function (err) {
                if (err) throw err;
                console.log('Saved!');
            });

            break;

        default:

            if (forbid(channel)) {
                break;
            }

            reply(5, fuck, channel);

            flag = true;

            break;
    }
}

function clean(cmd)
{
    mumiJSON.cmd = '';
    mesJSON.cmd = '';
    fs.writeFile('mumiJSON', JSON.stringify(mumiJSON, null, '\t'), 'utf-8', function (err) {
        if (err) throw err;
        console.log('clear!');
    });
    fs.writeFile('mes', JSON.stringify(mesJSON, null, '\t'), 'utf-8', function (err) {
        if (err) throw err;
        console.log('clear!');
    });
}

function mami(cmd,USER)
{
    mesJSON.cmd += USER;
    mesJSON.cmd += '\n';
    mesJSON.cmd += message;
    mesJSON.cmd += '\n';
    fs.writeFile('mes', JSON.stringify(mesJSON, null, '\t'), 'utf-8', function (err) {
        if (err) throw err;
        console.log(USER);
        console.log('紀錄完成!');
    });
}

function mumi(cmd)
{
    cmd = cmd.split("mumi")[1];
    mumiJSON.cmd += cmd;
    fs.writeFile('mumiJSON', JSON.stringify(mumiJSON, null, '\t'), 'utf-8', function (err)
    {
        if (err) throw err;
        console.log('Saved!');
    });
}

function readFile()
{
    var data = fs.readFileSync('BotInfo', 'utf-8');
    var datab = fs.readFileSync('mumiJSON', 'utf-8');
    var datac = fs.readFileSync('mes', 'utf-8');
    var datad = fs.readFileSync('ACGN', 'utf-8');
    botInfoJSON = JSON.parse(data);
    mumiJSON = JSON.parse(datab);
    mesJSON = JSON.parse(datac);
    ACGNJSON = JSON.parse(datad);
	highPriceMessage = ACGNJSON.highPriceMessage;
	lowPriceMessage = ACGNJSON.lowPriceMessage;
	noDealMessage = ACGNJSON.noDealMessage;
	listPriceMessage = ACGNJSON.listPriceMessage;
	lowquantime = ACGNJSON.lowquantime;
	highPriceCompanyAmount = ACGNJSON.highPriceCompanyAmount;
	QAQ = botInfoJSON.QAQ;
	IDLE = botInfoJSON.IDLE;
	maxNum = botInfoJSON.maxNum;
	minNum = botInfoJSON.minNum;
	fuck = botInfoJSON.fuck;
	yuki = botInfoJSON.yuki;
	longblack = botInfoJSON.longblack;
	FGO = botInfoJSON.FGO;
	kumiko = botInfoJSON.kumiko;
    miku = botInfoJSON.miku;
    chino = botInfoJSON.chino;
    loli = botInfoJSON.loli;
    LoveLive = botInfoJSON.LoveLive;
    rocket = botInfoJSON.rocket;
    sister = botInfoJSON.sister;
    kyoani = botInfoJSON.kyoani;
    yukino = botInfoJSON.yukino;
    heroin = botInfoJSON.heroin;
    count = botInfoJSON.count;
}

function forbid(channel)
{
    if ((channel.name == "hall") || (channel.name == "lobby"))
	{
		return true;
	}
}

function match(K)
{
	return K.match(/[^ ]+([\s\S]+)/)[1]; // [\s\S]+ ---> 所有字元包含換行有多少抓多少 ---> abc dddd ---> dddd
}

function reply(a, cmd, channel)
{
	if (a == 1) //存入指令確認
    {
		embed = new Discord.RichEmbed()
			.setTitle("save message")
			.setThumbnail("http://i.imgur.com/T4y0egb.jpg")
			.setColor(3447003)
			.addField("雪乃からの伝言", yuki[random(yuki.length)])
			.setFooter("比企谷雪乃")
			.setTimestamp();
		channel.send( { embed} );
		return match(cmd);
	}
	else if (a == 2) //回應呼叫
    {
		embed = new Discord.RichEmbed()
			.setTitle("message")
			.setThumbnail("http://i.imgur.com/T4y0egb.jpg")
			.setColor(3447003)
			.addField("雪乃からの伝言", yuki[random(yuki.length)])
			.addField("雪乃が教えてあげる", cmd)
			.setFooter("比企谷雪乃")
			.setTimestamp();
	}
	else if (a == 3) //papago專用
	{
        embed = new Discord.RichEmbed()
            .setImage(cmd);
    }
    else if (a == 4) //%%say專用
    {
        embed = new Discord.RichEmbed()
            .setTitle("message")
            .setThumbnail("http://i.imgur.com/T4y0egb.jpg")
            .setColor(3447003)
            .addField("雪乃からの伝言", cmd)
            .setFooter("比企谷雪乃")
            .setTimestamp();
    }
    else if (a == 5)
    {
        embed = new Discord.RichEmbed()
            .setTitle("papago87")
            .setThumbnail("http://i.imgur.com/T4y0egb.jpg")
            .setColor(3447003)
            .addField("雪乃が教えてあげる", cmd)
            .setFooter("比企谷雪乃")
            .setTimestamp();
    }
    channel.send({ embed });
}

function detect(user)
{
    if ((user !== "高價釋股通知") && (user !== "papago89") && (user !== "Euphokumiko") && (user !== "vios10009")&&(user !== "低價釋股通知")&&(user !== "低量釋股通知")&&(user !== "股價更新通知"))
	{
		return true;
	}
	else
	{
        return false;
	}
}

function random(a)
{
	var n = Math.floor(Math.random() * (a )) + minNum;
	return n;
}

client.on('ready', function (evt) {

	logger.info('Connected');

	logger.info('Logged in as: ');

	logger.info(client.user.username + ' - (' + client.user.id + ')');
	
	readFile();
});

client.on('message', message =>
{
    try
    {
        message.embed[0].Image((PIC) => {
            console.log(PIC);
            rp(PIC).pipe(fs.createWriteStream(__dirname + '/temp/',ACGNJSON.count))
        });
        ACGNJSON.count += 1;

        fs.writeFile('ACGN', JSON.stringify(ACGNJSON, null, '\t'), 'utf-8', function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    }
    catch(err)
    {
        
    }


    if (message.content.substring(0, 2) == '%%')
    {

		var flag = false;

		var cmd = message.content.split('%%')[1]; // 將命令去除用來識別的!號 ---> !abc dddd ---> abc dddd

        var arg = cmd.split(/\s/)[0];// 找出命令的第一個斷點 以空白分開 ---> abc dddd ---> abc

        var nu = cmd.split(/\s/)[2];

        var TY = cmd.split(/\s/)[1];

        var R, overflow;

		logger.info(message.author.username);

		logger.info(message.author.id);

        logger.info(message.channel.name);

        switch (arg)
        {

            case 'roll':

                if (Number(nu) > 11)
                {
                    reply(5, "你有病嗎？沒空幫你骰這麼多次。當我很閒？", message.channel);
                    break;
                }

                for (R = 0; R < Number(nu); R++)
                {
                    
                    swit(TY, cmd, message.author.username, message.channel);
                }

                break;

            case 'janken':

                random(3);

                break;
            default:

                swit(arg, cmd, message.author.username, message.channel);

                break;
        }

	}

});

client.login(auth.token);