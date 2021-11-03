require("dotenv").config();
const { Client, Intents } = require("discord.js");

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
});

client.once("ready", () => {
    console.log("TutoBot is ready!");
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Bot iniciado com ${client.users.cache.size}, em ${client.channels.cache.size} canais, em ${client.guilds.cache.size} servidores!`);
});

client.once("guildCreate", guild => {
    console.log(`Bot entrou em um novo servidor!`);
    console.log(`Nome: ${guild.name} (id: ${guild.id}). Populacão ${guild.memberCount} membros.`);
});

client.once("guildDelete", guild => {
    console.log(`O bot foi removido do servidor ${guild.name} (id: ${guild.id}).`);
});

client.once("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type == "dm") return;
    if (message.content.startsWith("!ping")) {
        message.channel.send("Pong!");
    }
});

client.login(process.env.TOKEN);