const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ajuda')
    .setDescription('Mostra todos os comandos do bot'),

  async execute(interaction) {
    await interaction.reply(
      `📘 **COMANDOS DISPONÍVEIS:**\n
/anuncio → Gera anúncio com IA
/ajuda → Mostra esta mensagem`
    );
  }
};
