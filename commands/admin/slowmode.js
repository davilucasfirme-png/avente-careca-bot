const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slowmode')
        .setDescription('Ativa ou muda o slowmode do canal')
        .addIntegerOption(option =>
            option.setName('segundos')
                .setDescription('Tempo entre mensagens (0 para remover)')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        const segundos = interaction.options.getInteger('segundos');

        await interaction.channel.setRateLimitPerUser(segundos);

        if (segundos === 0)
            return interaction.reply("⏱️ Slowmode **desativado**!");

        return interaction.reply(`🐢 Slowmode definido para **${segundos} segundos**.`);
    }
};
