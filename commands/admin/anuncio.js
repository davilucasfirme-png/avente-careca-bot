const { SlashCommandBuilder } = require('discord.js');
const { gerarAnuncio } = require('../../util/adGenerator');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('anuncio')
    .setDescription('Gera um anúncio automático com IA')
    .addStringOption(option =>
      option
        .setName('produto')
        .setDescription('Produto ou serviço')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('publico')
        .setDescription('Público-alvo')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('objetivo')
        .setDescription('Objetivo do anúncio')
        .setRequired(true)
    ),

  async execute(interaction) {
    const produto = interaction.options.getString('produto');
    const publico = interaction.options.getString('publico');
    const objetivo = interaction.options.getString('objetivo');

    await interaction.reply('🤖 Gerando anúncio com IA...');

    try {
      const anuncio = await gerarAnuncio(produto, publico, objetivo);

      await interaction.editReply({
        content: `📢 **ANÚNCIO GERADO:**\n\n${anuncio}`
      });

    } catch (err) {
      console.error(err);
      await interaction.editReply('❌ Erro ao gerar anúncio.');
    }
  }
};
