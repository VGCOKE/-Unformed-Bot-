const Discord = require('discord.js');

const client = new Discord.Client();

const { prefix, bot_info, token } = require('./config.json');
client.on('ready', () => {
	console.log(bot_info.name);
	console.log(bot_info.prefix);
	client.user.setStatus('available');
	client.user.setActivity('bad guys!', { type: "WATCHING" });
});

client.on('message', message => {
	if(message.content === `${prefix}help`) {
		message.channel.send('Hi! I am **Eh Bot**! Use  . for commands! ');
	}else if(message.content === `${prefix}server`) {
		const embed = new Discord.MessageEmbed()
			.setColor("#3498db")
			.setTitle('Server Info')
			.setAuthor('[Eh Bot]')
			.setDescription(
				`Server name: ${message.guild.name}
				Member Count: ${message.guild.memberCount}
				Owner : ${message.guild.owner}`);
		return message.channel.send(embed);
	}else if(message.content === `${prefix}info`) {
		const embed = new Discord.MessageEmbed()
			.setColor("#3498db")
			.setTitle('Member Info')
			.setAuthor('[Eh Bot]')
			.setDescription(
				`Username : ${message.author}
				ID : ${message.author.id}`);
		return message.channel.send(embed);
	}else if(message.content === `${prefix}clear`) {
		message.channel.message.fetch().then((results) => {
			message.channel.bulkDelete(results);
		});
	}else if(message.content === `${prefix}status`) {
		const content = message.content.replace('status', '');
		client.user.setPresence({
			activity: {
				name:content,
				type: 0,
			},
		});
	}
});

client.login(token);