const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ajuda')
    .setDescription('Mostra todos os comandos do bot'),

  async execute(interaction) {
    try {
      await interaction.reply({
        content:
`📘 **COMANDOS DISPONÍVEIS**

🧠 IA
/anuncio → Gera anúncio com IA

⚙️ Sistema
/ajuda → Mostra esta mensagem`,
        ephemeral: true
      });
    } catch (err) {
      console.error('Erro no /ajuda:', err);
    }
  }
};