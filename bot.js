const fetch = require("node-fetch");
const Discord = require('discord.js');

console.log("Beep boop I'm a bot.");

const client = new Discord.Client(); 
client.login('brauchtnochkey');
//eventhandler als meldung ob logged in
client.on('ready', readyDiscord );

function readyDiscord(){
    console.log('BaumhausBot initiated.');
}

const replies = [
    'Hey du',
    'hey, was gibts?',
    'Ja?',
    'Brauchst du was?',
]

client.on('message', gotMessage);

function gotMessage(msg){
    console.log(msg.content); //nimmt chat auf, kann weg oder neue func
    if (msg.content === 'Hey longcat') {
        const i = Math.floor(Math.random() * replies.length);
        msg.channel.send(replies[i]);
    }
}

//Aus API den json string, in var, in .setImage
client.on('message', catMessage);

function catMessage(msg){
    if (msg.content === '!caturday'){
        
        fetch('https://aws.random.cat/meow')
        .then(res => res.json())
        .then(json => {
        catResult = json.file;

        const imageEmbed = new Discord.MessageEmbed()
        .setTitle('Here is your cat')
        .setImage(catResult);
        msg.channel.send(imageEmbed);
    });
    }
}

client.on('message', xkcdMessage);

function xkcdMessage(msg){
    if (msg.content === '!xkcd'){
        
        fetch('http://xkcd.com/info.0.json')
        .then(res =>  res.json())
        .then(json => {
        xkcdImage = json.img;
        xkcdComment = json.alt;

        const imageEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Aktueller xkcd comic')
        .setImage(xkcdImage)
        .addFields(
            { name: 'Comment:', value: xkcdComment },
        )
        msg.channel.send(imageEmbed);
    });
    }
}

client.on('message', z0rMessage);

function z0rMessage(msg){
    if (msg.content === '!z0r') {
        const i = Math.floor(Math.random() * (7911 - 1) + 1);
        msg.channel.send('https://z0r.de/' + [i]);
    }
}

client.on('message', helpMessage);

function helpMessage(msg){
    if (msg.content === '!help') {
        msg.channel.send(helpEmbed);
    }
}

const helpEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Longcat Help')
	.setThumbnail('http://www.blindfiveyearold.com/wp-content/uploads/2013/04/longcat-is-long.jpg')
	.addFields(
        { name: 'Commands', value:
         '\n\n\nHey longcat\n!help\n!caturday\n!z0r\n!xkcd' },
	)
	.setImage('https://st5.ning.com/topology/rest/1.0/file/get/2260881579')
	.setTimestamp()










    