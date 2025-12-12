const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    async execute(member) {
        const canal = member.guild.systemChannel || member.guild.channels.cache.find(c => c.name && c.name.toLowerCase().includes("bem-vindo"));
        if (!canal) return;

        const embed = new EmbedBuilder()
            .setTitle("🎉 Bem-vindo!")
            .setDescription(`Olá ${member}, seja bem-vindo ao servidor!`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setColor("Green");

        canal.send({ embeds: [embed] }).catch(() => {});
    }
};
