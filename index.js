var Discord = require('discord.js');
var botconfig = require('./botconfig.json');
var {MessageEmbed} = require('discord.js');
var superagent = require('superagent');
var moment = require('moment');
var bot = new Discord.Client();

const token = 'NTk3MzI1MTcxNDA5NTUxMzk5.Xm3dnQ.w5UU33S0d5fFVqBf4zExAvU4uOk';

const PREFIX = '.';

bot.on('ready', () => {
    console.log('This bot is ready!');
    bot.user.setActivity('Dinera!!!', { type: 'WATCHING'}).catch(console.error);
})

bot.on('message', message=>{


    if(!message.content.startsWith(PREFIX)) return; 
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'ping':
            message.channel.send('Pong!')
            break;
        case 'website':
            message.reply('Sorry! Our website is in progress. If you have any questions, please DM our staffs. Thank you!')
            break;
        case 'clear':
            if(!args[1]) return message.reply('Error, please enter a number.')
            message.channel.bulkDelete(args[1]);
            break;
        case 'avatar':
            message.channel.send(message.author.displayAvatarURL());
            
    }
})

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'entrance');
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}! Please say "!verify" to access Dinera!`);
  });

bot.on('message', message=>{
    if(message.content === "HI JAYBOT"){
        message.reply('Hi friend! I hope you will have a splendid day/night here at Dinera!')
    }
    if(message.content === "Hotel"){
        message.channel.send('Trivago')
    }
});

bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === `${prefix}serverinfo`){
        let sEmbed = new MessageEmbed()
        .setColor("0x00FFFF")
        .setTitle("Server Information")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.guild.name}`, message.guild.iconURL)
        .addField("**Guild Name:**", `${message.guild.name}`)
        .addField("**Guild Owner:**", `${message.guild.owner}`)
        .addField("**Member Count:**", `{message.guild.memberCount}`)
        .setFooter(`Created by JAYooo#9748`, bot.user.displayAvatarURL);
        message.channel.send({embed: sEmbed});
    }

    if(cmd === `${prefix}cat`) {
        let msg = await message.channel.send("Generating...")

        let {body} = await superagent
        .get(`http://aws.random.cat/meow`)
        //console.log(body.file)
        if(!{body}) return message.channel.send("I broke! Please try again!")
                     
            let cEmbed = new Discord.MessageEmbed()
            .setColor("0x00FFFF")
            .setAuthor('Here is a cat for you!', message.guild.iconURL)
            .setImage(body.file)
            .setTimestamp()
            .setFooter(`Created by JAYooo#9748`, bot.user.displayAvatarURL)

            message.channel.send({embed: cEmbed})

            msg.delete();
    }

    if(cmd === `${prefix}dog`) {
        let msg = await message.channel.send("Generating...")

        let {body} = await superagent
        .get(`https://dog.ceo/api/breeds/image/random`)
        //console.log(body.file)
        if(!{body}) return message.channel.send("I broke! Please try again!")
                     
            let dEmbed = new Discord.MessageEmbed()
            .setColor("0x00FFFF")
            .setAuthor('Here is a dog for you!', message.guild.iconURL)
            .setImage(body.message)
            .setTimestamp()
            .setFooter(`Created by JAYooo#9748`, bot.user.displayAvatarURL)

            message.channel.send({embed: dEmbed})

            msg.delete();
    }
})

bot.login(token);