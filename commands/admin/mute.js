const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Silencia um usuário (timeout)')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Usuário que será mutado')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('minutos')
                .setDescription('Tempo do mute em minutos')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction) {
        const user = interaction.options.getUser('usuario');
        const minutos = interaction.options.getInteger('minutos');

        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            return interaction.reply({ content: "Usuário não encontrado.", ephemeral: true });
        }

        const ms = minutos * 60 * 1000;
        await member.timeout(ms);

        return interaction.reply(`🔇 **${user.tag}** foi mutado por **${minutos} minutos**.`);
    }
};
