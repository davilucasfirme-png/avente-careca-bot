// index.js
require("dotenv").config();
const { Client, GatewayIntentBits, Collection, Partials } = require("discord.js");
const fs = require("fs");
const path = require("path");

// Cria client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ],
    partials: [Partials.Channel, Partials.Message, Partials.User]
});

// Collection para comandos
client.commands = new Collection();

// Carrega comandos (espera pasta /commands com subpastas)
const commandsPath = path.join(__dirname, "commands");
if (fs.existsSync(commandsPath)) {
    const commandFolders = fs.readdirSync(commandsPath);
    for (const folder of commandFolders) {
        const folderPath = path.join(commandsPath, folder);
        if (!fs.lstatSync(folderPath).isDirectory()) continue;
        const commandFiles = fs.readdirSync(folderPath).filter(f => f.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(folderPath, file);
            try {
                const command = require(filePath);
                if (command && command.data && command.execute) {
                    client.commands.set(command.data.name, command);
                    console.log(`Comando carregado: ${command.data.name}`);
                } else {
                    console.log(`Arquivo de comando inválido (ignorado): ${filePath}`);
                }
            } catch (err) {
                console.error(`Erro ao carregar comando ${filePath}:`, err);
            }
        }
    }
} else {
    console.log("Pasta commands/ não encontrada. Crie a pasta e adicione comandos.");
}

// Carrega eventos (espera pasta /events)
const eventsPath = path.join(__dirname, "events");
if (fs.existsSync(eventsPath)) {
    const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith('.js'));
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        try {
            const event = require(filePath);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
            console.log(`Evento carregado: ${event.name}`);
        } catch (err) {
            console.error(`Erro ao carregar evento ${filePath}:`, err);
        }
    }
} else {
    console.log("Pasta events/ não encontrada. Crie a pasta e adicione eventos.");
}

// Log de erro para ajudar debug
process.on("unhandledRejection", (error) => {
    console.error("Unhandled promise rejection:", error);
});

// Login
const token = process.env.DISCORD_TOKEN;
if (!token) {
    console.error("ERRO: Variável DISCORD_TOKEN não encontrada no .env");
    process.exit(1);
}
client.login(token);
