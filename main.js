/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

const client = new Discord.Client();

const { prefix, bot_info, token } = require('./config.json');
client.on('ready', () => {
	console.log(bot_info.name);
	console.log(bot_info.prefix);
	client.user.setStatus('available');
	client.user.setActivity('bad guys!', { type: "WATCHING" });
});

client.on("guildMemberAdd", (member) => {
	console.log(`${member.user.username} has joined`);
	const message = `Hi! <@${member.id}> has joined the server!`;
	const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome');
	welcomeChannel.send(message);
});

client.on("guildMemberRemove", (member) => {
	console.log(`${member.user.username} has left`);
	const message = `Bye :( <@${member.id}> has left the server...`;
	const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome');
	welcomeChannel.send(message);
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
				{ name: 'Create Text Channel', value: '`.createtchannel`', inline: true },
				{ name: 'Create Voice Channel', value: '`.createvchannel`', inline: true },
				{ name: 'Ban Members', value: '`.ban`', inline: true },
			);
		return message.channel.send(embed);
	}else if (message.content.startsWith(`${prefix}server`)) {
		const embed = new Discord.MessageEmbed()
			.setColor("#3498db")
			.setTitle(`${message.guild.name}`)
			.setAuthor('[Eh Bot]')
			.addFields(
				{ name: 'Server Info', value: `${message.guild.name}` },
				{ name: 'Members Count', value: `${message.guild.memberCount}` },
				{ name: 'Owner', value: `${message.guild.owner}` },
			);
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
	}else if(message.content.startsWith(`${prefix}createtchannel`)) {
		const args = message.content.slice(15);
		message.guild.channels.create(`${args}`, {
			type: 'text',
		}).then(channel => {
			channel.setTopic(`Click here to edit!`);
		});
		message.channel.send(`${message.author} has created a text channel!`);
	}else if(message.content.startsWith(`${prefix}createvchannel`)) {
		const args = message.content.slice(15);
		message.guild.channels.create(`${args}`, {
			type: 'voice',
		}).then(channel => {
			channel.setTopic(`Click here to edit!`);
		});
		message.channel.send(`${message.author} has created a voice channel!`);
	}else if(message.content.startsWith(`${prefix}ban`)) {
		const user = message.mentions.users.first();
		if(user) {
			const member = message.guild.member(user);
			if(member) {
				member.ban({ ression: 'you were bad!' }).then(() =>{
					message.reply(`BANNED ${user.tag}`);
				});
			}else {
				message.reply("INVALID");
			}
		}
	}
});

client.login(token);
