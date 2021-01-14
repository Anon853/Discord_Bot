const fetch = require("node-fetch");
const Discord = require('discord.js');
const keyLoader = require ('./key.json');
const keyLoaderWetter = require ('./key_wetter.json');
const colorLoader = require ('./colors.json');
const fs = require('fs');
console.log("====== Bot booting up ======");
const client = new Discord.Client(); 
client.login(keyLoader.key);//key aus local key.json, weil git meckert dass der key public geht.
const readyDiscord = () => console.log('====== Bot initiated ======');
client.on('ready', readyDiscord );
require('events').defaultMaxListeners = 70;

const replies = [   
  ' hey du',
  ' na, was gibts?',
  ' ja?',
  ' brauchst du was?',
  ' für commands !help'
];

const gotMessage = (msg) => {
  console.log(msg.content); 
  if (msg.content === 'Hey hausbot') {
    const i = Math.floor(Math.random() * replies.length);
    msg.reply(replies[i]);
  }
}

client.on('message', gotMessage);

const catMessage = (msg) => {
  if (msg.content === '!caturday'){
    fetch('https://aws.random.cat/meow')
     .then(res => res.json())
     .then(json => {
     catResult = json.file;

    const imageEmbed = new Discord.MessageEmbed()
     .setTitle('Here is your cat')
     .setImage(catResult);
     msg.channel.send(imageEmbed);
  }) .catch(err => console.log(err));
 }
}

client.on('message', catMessage);

const xkcdMessage = (msg) => {
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
    }).catch(err => console.log(err));
  }
}

client.on('message', xkcdMessage);

const wetterMessage = (msg) => {
  if (msg.content === '!wetter'){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Hamburg&appid=' + keyLoaderWetter.key)
     .then(res => res.json())
     .then(json => {
      wetterData = json;
      wetterTempValue = Math.floor(json.main.temp - 273.15); //weil kelvin
      wetterTempValueFeelsLike = Math.floor(json.main.feels_like - 273.15);
      sunsetJsonValue = String(json.sys.sunset); //weil da ein riesen int rauskommt, zu string, substr aufgeteilt in std und min positionen
      sunsetStringHours = sunsetJsonValue.substr(0,2);
      sunsetStringMinutes = sunsetJsonValue.substr(2,2);
      windValue = Math.floor(json.wind.speed * 3.6); //Wind km/h = wind m/s * 3.6

    if (wetterTempValue >= 0 && wetterTempValue <= 5) {
        colorLoaderValue = colorLoader.color1;
    } else if (wetterTempValue >= 5 && wetterTempValue <= 9) {
        colorLoaderValue = colorLoader.color2;
    } else if (wetterTempValue >= 9  && wetterTempValue <= 13) {
        colorLoaderValue = colorLoader.color3;
    } else if (wetterTempValue >= 13  && wetterTempValue <= 17) {
        colorLoaderValue = colorLoader.color4; 
    } else if (wetterTempValue >= 17  && wetterTempValue <= 21) {
        colorLoaderValue = colorLoader.color5;
    } else if (wetterTempValue >= 21  && wetterTempValue <= 25) {
        colorLoaderValue = colorLoader.color6;
    } else if (wetterTempValue >= 25  && wetterTempValue <= 99) {
        colorLoaderValue = colorLoader.color7;   
    } else {
        colorLoaderValue = colorLoader.color8; 
    }

    const wetterEmbed = new Discord.MessageEmbed()
     .setColor(colorLoaderValue)
     .setTitle('Aktuelles Wetter Hamburg')
     .addFields(
      { name: 'Temperatur: ', value: wetterTempValue + "°C" },
      { name: 'Gefühlt wie : ', value: (wetterTempValueFeelsLike + "°C" )},  
      { name: 'Wolken: ', value: json.clouds.all + "% bewölkt" },
      { name: 'Luftfeuchtigkeit: ', value: (json.main.humidity + "%")},    
      { name: 'Sonnenuntergang: ', value: (sunsetStringHours + ":" + sunsetStringMinutes)},
      { name: 'Windstärke: ', value: (windValue + " km/h")}
      )
      msg.channel.send(wetterEmbed);
    }).catch(err => console.log(err));
  }
}

client.on('message', wetterMessage);

const z0rMessage = (msg) => {
  if (msg.content === '!z0r') {
    const i = Math.floor(Math.random() * (7911 - 1) + 1);
    msg.channel.send('https://z0r.de/' + [i]);
  }
}

client.on('message', z0rMessage);

const helpMessage = (msg) => {
  if (msg.content === '!help') {
    msg.channel.send(helpEmbed);
  }
}

client.on('message', helpMessage);

const helpEmbed = new Discord.MessageEmbed()
 .setColor('#0099ff')
 .setTitle('Hausbot Help')
 .setThumbnail('https://cacm.acm.org/system/assets/0002/7171/042617_warosuOrg_robot_butler.large.jpeg')
 .addFields(
 { name: 'Commands', value:
 '\n\n\nHey hausbot\n!help\n!caturday\n!z0r\n!xkcd\n!wetter\n!secretword\n!highscore\n!figlet TEXT(20 Zeichen max)' },
 )
 .setImage('http://www.dts-tech.com/wp-content/uploads/2017/05/Help-Desk-Image-ID-c1bb886f-73c6-452d-fe4b-c2c298c492a3.png')
 .setTimestamp();

// const secretMessageFunc = () => {
//   new Discord.MessageEmbed()
//  .setColor('#0099ff')
//  .setTitle('It happened!')
//  .addFields(
//   { name: 'Oh snap!', value:
//   '@everyone , hat das geheime Wort gesagt!\n\nMeldet es AG für einen Punkt in der Highscore-Liste und ein neues secret Wort.' },
//   )
//   .setImage('http://www.relatably.com/m/img/success-kid-memes/g1369638954952825892.jpg.png')
  
// }

// const secretMessageCheck = (msg) => {
//   if (msg.content.includes('Linus Torvalds')) {msg.channel.send(secretMessageFunc()).catch(err => console.log(err));} 
//   else if (msg.content.includes('linus torvalds')) {msg.channel.send(secretMessageFunc()).catch(err => console.log(err));}
 
// }
    


const secretMessageCheck = (msg) => {
  
    var secretMessageEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('It happened!')
	.addFields(
    { name: 'Oh heck!', value:'@everyone , ' + msg.author.username + ' hat das geheime Wort gesagt!\n\nMeldet es AG für einen Punkt in der Highscore-Liste und ein neues secret Wort.' },
	)
    .setImage('http://www.relatably.com/m/img/success-kid-memes/g1369638954952825892.jpg.png')
    


    if (msg.content.includes('test')) {msg.channel.send({embed: secretMessageEmbed});}
    else if (msg.content.includes('Javascript')) {msg.channel.send({embed: secretMessageEmbed});};
    }
    

//client.on('message', secretMessageCheck);

client.on('message', secretMessageCheck);
    
const secretRulesMessage = (msg) => {
  if (msg.content === '!secretword') {
    var secretRulesEmbed = new Discord.MessageEmbed() 
     .setColor('#ff0000')
     .addFields({name: "Secret Word", value: 'Findet das geheime Wort herraus und steigt in der Highscore-Liste auf. Hint: GNU/Linux' })
     .setImage('https://2.bp.blogspot.com/-Ppx9Jrs13vA/T_Zcl5cncXI/AAAAAAAACno/4PHfU9NA35o/s1600/The_Riddler_3.png')
  }
  msg.channel.send(secretRulesEmbed)
  .catch(err => console.log(err));
}
client.on('message', secretRulesMessage);
    
const highscoreMessage = (msg) => {
  if (msg.content === '!highscore') {
    var highscoreEmbed = new Discord.MessageEmbed() 
     .setColor('#ff0000')
     .addFields({name: "Secret word highscore", value: '1.\n2.\n3.\n' })
     .setImage('https://i.ytimg.com/vi/Y0qk55jUKhk/maxresdefault.jpg')
  }
  msg.channel.send(highscoreEmbed)
  .catch(err => console.log(err));
}   
client.on('message', highscoreMessage);

//curl -d msg=test https://uploadbeta.com/api/figlet/ 
// Querry funktioniert im browser, curl, function nur wenn es schon im browser aufgerufen wurde
// Error 503 unavailable

// const figletMessageThree = (message) => {
//     if (message.content === 'f3') {
//         let msg = '215';

//         fetch('https://uploadbeta.com/api/figlet/', {
//             method: 'POST',
//             body: (msg),
//             headers: { 'Content-Type': 'application/json' }
//         }).then(res => res.json())
//             .then(json => console.log(json));
//           } 
//         }
//     client.on('message', figletMessageThree);


// const figletMessage = (msg) => {
//     if (msg.content === 'f') {
        
//         fetch('https://uploadbeta.com/api/figlet/?cached&msg=111')
//         .then(res => res.json())                                    
//         .then(json => {
//             console.log(json);
//             let figletResult = json;  
//             msg.channel.send('```' + figletResult + '```')
//         })
//         .catch(err => console.log(err));
//     }
// }

// client.on('message', figletMessage);

const figletMessageTwo = (msg) => {
  if (msg.content.includes('!figlet')) {
    let figletInput = msg.content; 
    let figletSubstringValue = figletInput.substr(8,28);
    if (figletSubstringValue > 28) {
      msg.channel.send('Nicht mehr als 20 Zeichen.')
      .catch(err => console.log(err));
    } else {
      fetch('http://api.textart.io/figlet.json?text=' + figletSubstringValue + '&style=slant&encode=false') 
      .then(res => res.json())                                    
      .then(json => {
        let figletResult = json.contents.figlet;  
        msg.channel.send('```' + figletResult + '```')
    }).catch(err => console.log(err));
  }}
}

client.on('message', figletMessageTwo);

//serial usb -> file
//tail -f /dev/ttyUSB0 > /home/user/Dev/Discord_Bot/arduinoData.txt
//truncate -s 0 arduinoData.txt 
//tail -c +43 arduinoData.txt
const arduinoMessage = (msg) => {

  if (msg.content === '!arduino') {

    fs.readFile('arduinoData.txt', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      } else {
      console.log(data);
      let messageData = [data];

      var arduinoEmbed = new Discord.MessageEmbed() 
      .setColor('#ff0000')
      .addFields({name: "Data", value: messageData[0] })
      msg.channel.send(arduinoEmbed);
    }
  }
,)}}

client.on('message', arduinoMessage);