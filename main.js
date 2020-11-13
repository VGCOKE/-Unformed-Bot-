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
		const embed = new Discord.MessageEmbed()
			.setColor("#3498db")
			.setTitle('Commands List')
			.addFields(
				{ name: 'Server Info', value: '`.server`', inline: true },
				{ name: 'Member Info', value: '`.info`', inline: true },
				{ name: 'Clear Chat', value: '`.clear`', inline: true },
			);
		return message.channel.send(embed);
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
		message.channel.messages.fetch().then((results) => {
			message.channel.bulkDelete(results);
		});
		const embed = new Discord.MessageEmbed()
			.setColor("#3498db")
			.setTitle('Clear Messages')
			.setAuthor('[Eh Bot]')
			.setDescription(
				`Cleared ${message.author}`);
		return message.channel.send(embed);
	}
});

client.login(token);