module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(`🔥 Bot online: ${client.user.tag}`);
        try {
            client.user.setActivity("Sistema Premium • /ia", { type: 3 });
        } catch {}
    }
};
