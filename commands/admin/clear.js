const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Apaga mensagens do chat')
    .addIntegerOption(option =>
      option
        .setName('quantidade')
        .setDescription('Número de mensagens (máx 100)')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger('quantidade');

    // Validação obrigatória
    if (amount < 1 || amount > 100) {
      return interaction.reply({
        content: '❌ Você deve escolher um número entre 1 e 100.',
        ephemeral: true
      });
    }

    await interaction.deferReply({ ephemeral: true });

    const messages = await interaction.channel.messages.fetch({
      limit: amount
    });

    await interaction.channel.bulkDelete(messages, true);

    await interaction.editReply(`🧹 ${messages.size} mensagens apagadas com sucesso.`);
  }
};
