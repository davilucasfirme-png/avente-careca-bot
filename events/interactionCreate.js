// events/interactionCreate.js
const { PermissionsBitField } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        try {
            // Slash commands
            if (interaction.isChatInputCommand()) {
                const command = client.commands.get(interaction.commandName);
                if (!command) return interaction.reply({ content: "Comando não encontrado.", ephemeral: true });
                return command.execute(interaction, client);
            }

            // Button interactions (tickets, fechar ticket, painel)
            if (interaction.isButton()) {
                const id = interaction.customId;

                // abrir_ticket -> cria canal privado para usuário
                if (id === 'abrir_ticket') {
                    const guild = interaction.guild;
                    const user = interaction.user;
                    const name = `ticket-${user.username}`.slice(0, 32);

                    const existing = guild.channels.cache.find(c => c.name === name);
                    if (existing) {
                        await interaction.reply({ content: `Você já tem um ticket: ${existing}`, ephemeral: true });
                        return;
                    }

                    const channel = await guild.channels.create({
                        name,
                        type: 0, // GuildText
                        permissionOverwrites: [
                            { id: guild.id, deny: ['ViewChannel'] },
                            { id: user.id, allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory'] },
                            { id: client.user.id, allow: ['ViewChannel', 'SendMessages', 'ManageChannels'] }
                        ]
                    });

                    // send initial message with close button
                    const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
                    const row = new ActionRowBuilder().addComponents(
                        new ButtonBuilder().setCustomId('fechar_ticket').setLabel('Fechar Ticket').setStyle(ButtonStyle.Danger),
                        new ButtonBuilder().setCustomId('transf_ticket').setLabel('Transferir').setStyle(ButtonStyle.Secondary)
                    );
                    const embed = new EmbedBuilder()
                        .setTitle('🎫 Ticket Criado')
                        .setDescription(`Olá ${user}, descreva seu problema aqui. Um staff irá te atender em breve.`)
                        .setColor('Blue');

                    await channel.send({ content: `${user}`, embeds: [embed], components: [row] });
                    await interaction.reply({ content: `Ticket criado: ${channel}`, ephemeral: true });

                    // log
                    client.emit('log', `Ticket aberto: ${channel.name} por ${user.tag}`);
                    return;
                }

                // fechar ticket
                if (id === 'fechar_ticket') {
                    // only staff or channel creator can close; we simply archive (delete after 5s)
                    await interaction.reply({ content: 'Fechando ticket em 5s...', ephemeral: true });
                    setTimeout(async () => {
                        try {
                            await interaction.channel.delete(`Ticket fechado por ${interaction.user.tag}`);
                        } catch (err) {}
                    }, 5000);
                    return;
                }

                // outros botões podem ser tratados aqui
            }
        } catch (err) {
            console.error('Erro interactionCreate:', err);
            if (interaction.replied || interaction.deferred) {
                try { await interaction.editReply('❌ Erro ao processar interação.'); } catch {}
            } else {
                try { await interaction.reply({ content: '❌ Erro ao processar interação.', ephemeral: true }); } catch {}
            }
        }
    }
};
