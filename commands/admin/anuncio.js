const { SlashCommandBuilder } = require('discord.js');
const { gerarAnuncio } = require('../../util/adGenerator');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('anuncio')
    .setDescription('Generate an ad with AI')
    .addStringOption(option =>
      option
        .setName('produto')
        .setDescription('Product or service')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('publico')
        .setDescription('Target audience')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('objetivo')
        .setDescription('Ad objective')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('idioma')
        .setDescription('Language')
        .setRequired(true)
        .addChoices(
          { name: 'Português', value: 'pt' },
          { name: 'English', value: 'en' },
          { name: 'Español', value: 'es' }
        )
    ),

  async execute(interaction) {
    const produto = interaction.options.getString('produto');
    const publico = interaction.options.getString('publico');
    const objetivo = interaction.options.getString('objetivo');
    const idioma = interaction.options.getString('idioma');

    try {
      await interaction.deferReply();

      const anuncio = await gerarAnuncio(
        produto,
        publico,
        objetivo,
        idioma
      );

      await interaction.editReply({
        content: `📢 **AD GENERATED:**\n\n${anuncio}`
      });

    } catch (error) {
      console.error(error);
      await interaction.editReply('❌ Error generating ad.');
    }
  }
};
