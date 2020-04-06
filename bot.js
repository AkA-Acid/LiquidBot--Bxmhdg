const {Client,Attachment} = require('discord.js');
const bot = new Client();
const ms = require('ms');
const cheerio = require('cheerio');
const request = require('request');

const token = 'NjY2NzAwMDcyMjMwMDYwMDcy.XosGUg.2XvTLiE2AZ8SJa3_FOQXA1YkwnQ';

const PREFIX = 'bot>';

var invalidsuberror = ':x: ERROR :  Invalid subCommand. :x:';
var permissionerror = ':x: ERROR :  You do not have permission to perform this action. :x:';
var notinservererror = ':x: ERROR :  The person you are trying to punish is not currently in the server. :x:';
var timeerror = ':x: ERROR :  You did not spcify a time for the users punishment. :x:';
var gotpunished = 'You got punished for not respecting rules.';
var unablepunish = ':x: ERROR :  Unable to punish the user, check if they are currently in the server. :x:';

bot.on('ready', () => {
    console.log('Ready to use.');
    bot.user.setActivity("bot>help", {type : "PLAYING"});
});

bot.on('message', message => {

    let args = message.content.substring(PREFIX.lenght).split(" ");

    switch (args[0]) {
        case 'bot>help':
            const attachment = new Attachment('./helpLiquidBot.txt')
            message.channel.send(message.author, attachment);
            break;
        case 'bot>roleinfo':
            if(args[1] === 'staff') {
                message.channel.sendMessage('**Staff is a role that you get when you are a staff member, it is just to show everyone that you can help them!**')
            }else if(args[1] === 'moderator') {
                message.channel.sendMessage('**Moderator is a role that you get when you are a moderator of the server, you have access to all of the bot\'s commands and can help people in need.**')
            }else if(args[1] === 'owner') {
                message.channel.sendMessage('**Owner is a role that you get when you are the owner of the server.')
            }else if(args[1] === 'helper') {
                message.channel.sendMessage('**Helper is a role that you get when you are a helper of the server, it is just to show everyone that you can help them!**')
            }else if(args[1] === 'youtuber') {
                message.channel.sendMessage('**Youtuber is a role that you get when you have a youtube channel with 500+ subscribers.**')
            }else if(args[1] === 'donator') {
                message.channel.sendMessage('**Donator is a role that yo achieve donating to Acid.**')
            }else if(args[1] === 'bots') {
                message.channel.sendMessage('**Bots is a role that only bots have.**')
            }else if(args[1] === 'supercoolguy') {
                message.channel.sendMessage('**Supercoolguy is a role that you get when you are Acid\'s friend.**')
            }else {
                message.channel.sendMessage(invalidsuberror)
                    .then(msg => msg.delete(3000));
            }
            break;
        case 'bot>roles':
            message.channel.sendMessage('**The roles are :  owner, moderator, helper, staff, youtuber, donator, bots, supercoolguy (and members, appealing and muted. These three roles aren\'t in the "roleinfo" command).**')
            break;
        case 'bot>clear':
            if(!args[1]) return message.channel.sendMessage(invalidsuberror)
                .then(msg => msg.delete(3000));
            if(!message.member.roles.find(role => role.name === "Moderator")) return message.channel.send(permissionerror)
                .then(msg => msg.delete(3000));
            message.channel.bulkDelete(args[1]);
            break;
        case 'bot>tempmute':
            let person = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]))
            if(!person) return message.reply(notinservererror)
                .then(msg => msg.delete(3000));
            if(!message.member.roles.find(role => role.name === "Moderator")) return message.channel.send(permissionerror)
                .then(msg => msg.delete(3000));

            let mainrole = message.guild.roles.find(role => role.name === "Members");
            let muterole = message.guild.roles.find(role => role.name === "muted");

            let time = args[2];

            if(!time) {
                return message.reply(timeerror)
                    .then(msg => msg.delete(3000));
            }

            person.removeRole(mainrole.id);
            person.addRole(muterole.id);

            message.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}.`);

            setTimeout(function () {
                person.addRole(mainrole.id)
                person.removeRole(muterole.id)
                message.channel.send(`@${person.user.tag} has now been unmuted.`)
            }, ms(time));
            break;
        case 'bot>kick':
            if(!args[1]) return message.channel.send(invalidsuberror)
                .then(msg => msg.delete(3000));
            if(!message.member.roles.find(role => role.name === "Moderator")) return message.channel.send(permissionerror)
                .then(msg => msg.delete(3000));

            const user = message.mentions.users.first();

            if(user) {
                const member = message.guild.member(user);

                if(member) {
                    member.kick(gotpunished).then(() => {
                        message.reply(`Succesfully kicked ${user.tag}.`)
                    }).catch(err => {
                        message.reply(unablepunish)
                            .then(msg => msg.delete(3000));
                        console.log(error);
                    });
                }else {
                    message.reply(notinservererror)
                        .then(msg => msg.delete(3000));
                }
            }else {
                message.reply(notinservererror)
                    .then(msg => msg.delete(3000));
            }
            break;
        case 'bot>img':
                image(message);
         
                break;
            }

    
         
        });
         
        function image(message){
         
            var options = {
                url: "http://results.dogpile.com/serp?qc=images&q=" + "gaming",
                method: "GET",
                headers: {
                    "Accept": "text/html",
                    "User-Agent": "Chrome"
                }
            };
         
         
         
         
         
            request(options, function(error, response, responseBody) {
                if (error) {
                    return;
                }
         
         
                $ = cheerio.load(responseBody);
         
         
                var links = $(".image a.link");
         
                var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
               
                console.log(urls);
         
                if (!urls.length) {
                   
                    return;
                }

                message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
            });
         
         
         
         
         
         
         
         
        }
         
bot.login(token);
bot.login(process.env.token);
