const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, bot_info, token } = require('./config.json');
client.on('ready', () => {
	console.log(bot_info.name);
	console.log(bot_info.prefix);
	client.user.setActivity('bad guys', { type: "WATCHING" });
});

client.login(token);

client.on('message', message => {
	if(message.content === `${prefix}help`) {
		message.channel.send('Hi! I am **Eh Bot**! Use  / for commands! ');
	}else if(message.content === `${prefix}member`) {
		message.channel.send(`Total Members : **${message.guild.memberCount}**`);
	}else if(message.content === `${prefix}server`) {
		message.channel.send(`Server Name : **${message.guild.name}**`);
	}else if(message.content === `${prefix}info`) {
		message.channel.send(`Username : **${message.author.username}**`);
		message.channel.send(`ID : **${message.author.id}**`);
	}
});