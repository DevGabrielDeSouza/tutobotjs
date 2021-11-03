require("dotenv").config();

const config = require("./config.json"); 

const { Client, Intents } = require("discord.js");

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
	]
});

client.on("ready", () => {
	console.log("TutoBot is ready!");
	console.log(`Logged in as ${client.user.tag}!`);
	console.log(`Bot iniciado com ${client.users.cache.size}, em ${client.channels.cache.size} canais, em ${client.guilds.cache.size} servidores!`);
	client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores.`);
});

client.on("guildCreate", guild => {
	console.log(`Bot entrou em um novo servidor!`);
	console.log(`Nome: ${guild.name} (id: ${guild.id}). Populacão ${guild.memberCount} membros.`);
	client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores.`);
});

client.on("guildDelete", guild => {
	console.log(`O bot foi removido do servidor ${guild.name} (id: ${guild.id}).`);
	client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores.`);
});

client.on("messageCreate", async message => {
	if (message.author.bot) return;
	if (message.channel.type == "dm") return;
	
	if(!message.content.startsWith(config.prefix)) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const comando = args.shift().toLowerCase();
	
	// coamdno ping
	if(comando === "ping") {
		let m = await message.reply(`Pong! Calculando a latência...`);
		m.edit(`Pong!\nA Latência é ${m.createdTimestamp - message.createdTimestamp}ms!\nA Latencia da API é ${Math.round(client.ws.ping)}ms!`);
	}
});

client.login(process.env.TOKEN);