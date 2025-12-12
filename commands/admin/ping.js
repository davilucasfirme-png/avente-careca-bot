const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Mostra o ping do bot'),

    async execute(interaction) {
        const ping = interaction.client.ws.ping;
        return interaction.reply(`🏓 Pong! Meu ping é **${ping}ms**`);
    }
};
