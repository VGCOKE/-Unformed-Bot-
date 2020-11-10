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
	}else if(message.content === `${prefix}member`) {
		message.channel.send(`Total Members : **${message.guild.memberCount}**`);
	}else if(message.content === `${prefix}server`) {
		message.channel.send(`Server Name : **${message.guild.name}**`);
		message.channel.send(`Owner : **${message.guild.owner}**`);
	}else if(message.content === `${prefix}info`) {
		message.channel.send(`Username : **${message.author}**`);
		message.channel.send(`ID : **${message.author.id}**`);
	}
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if(command === "args") {
		if(!args.length) {
			const embed = new Discord.MessageEmbed()
				.setColor("#ff0000")
				.setTitle('ERROR')
				.setDescription('Not enough arguments')
				.setFooter('Bot Error Log');
			return message.channel.send(embed);
		}

		message.channel.send(`**Command name:** ${command}\n**Arguments:** ${args}`);
	} else if (command === 'ban') {
		const taggedUser = message.mentions.users.first();
		message.channel.send(`**You want to ban:** ${taggedUser.username}`);
		return;
	}
});

client.login(token);
