# Discord bot  

Chat bot that uses several APIs. Made in node.js, discord.js, shellscript

Demo video: https://youtu.be/tXqFxpLVK6c
[![Demo]([(https://youtu.be/tXqFxpLVK6c)](https://i.postimg.cc/SRPD78rM/Screenshot-1021.png))

Features
---------

![image](https://i.postimg.cc/BvZ89mM4/commands.png) 



Command  | Description
------------- | -------------
Hey hausbot  | Replies with a random greeting
!help  | Displays a list of available commands
!caturday | Displays a random cat image from an open image API
!z0r | Generates a link with a random index number to an animation
!xkcd | Displays the newest xkcd comic from xkcd.com's API
!wetter | Displays current weather stats in Hamburg from open weather API
!secretword | Hints what the current secret word is, bot scans messages to check if it was said
!highscore | Displays scoreboard of users that found the secret word
!figlet [text] | Creates ASCII art of input text through an API
!arduino | Displays current data from arduino sensor that saves temperature / humidity in text file

Notes
--------
Runs on AWS EC2 linux instance with PM2 daemon tool to keep node instance running. 

Resources
---------

* Weather API: https://openweathermap.org/api
* xkcd API: https://xkcd.com/info.0.json
* z0r: https://z0r.de/
* figlet API: http://api.textart.io/figlet.json?text=ThisIsAwesome
