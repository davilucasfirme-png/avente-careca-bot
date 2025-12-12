const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Apaga mensagens do chat')
        .addIntegerOption(option =>
            option.setName('quantidade')
            .setDescription('Número de mensagens para apagar')
            .setRequired(true)
        ),

    async execute(interaction) {
        const amount = interaction.options.getInteger('quantidade');

        if (!interaction.member.permissions.has("ManageMessages"))
            return interaction.reply({ content: "Você não tem permissão!", ephemeral: true });

        await interaction.channel.bulkDelete(amount, true);
        await interaction.reply(`Foram apagadas ${amount} mensagens!`);
    }
};
