const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Remove o mute de um usuário')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Usuário que será desmutado')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction) {
        const user = interaction.options.getUser('usuario');
        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            return interaction.reply({ content: "Usuário não encontrado.", ephemeral: true });
        }

        await member.timeout(null);
        return interaction.reply(`🔊 Usuário **${user.tag}** foi desmutado.`);
    }
};
