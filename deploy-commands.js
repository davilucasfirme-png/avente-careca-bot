require('dotenv').config({ override: true });

const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];

// Lê comandos da pasta commands/*
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if (command.data && command.execute) {
      commands.push(command.data.toJSON());
    }
  }
}

// DEBUG correto
console.log('DEBUG TOKEN:', process.env.DISCORD_TOKEN ? 'OK' : 'MISSING');
console.log('DEBUG CLIENT_ID:', process.env.CLIENT_ID);
console.log(`🚀 Enviando ${commands.length} comandos globais...`);

const rest = new REST({ version: '10' })
  .setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log('✅ Comandos globais registrados com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao registrar comandos:', error);
  }
})();
