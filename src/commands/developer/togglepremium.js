module.exports = {
    name: "togglepremium",
    description: "togglePremiumSimulator",
    usage: ["<prefix>togglepremium <server id>", "<prefix>togglepremium 1234567812345678"],
    enabled: true,
    aliases: [],
    category: "developer",
    memberPermissions: [],

    nsfw: false,
    dev: true,
    cooldown: 1000,

    async execute(client, message, args, data) {
        try {
            if (!args[0]) {
                return client.tools.sendEmbed(message, {
                    description: `no guild id specified`
                });
            }
            guild = await client.db.fetchGuild(args[0]);
            if (guild) {
                guild.premium = !guild.premium;
                await guild.save();
                return (client.tools.sendEmbed(message, {
                    title: `server premium status`,
                    description: `${guild.premium ? "👍" : "👎"}`
                }))
            }
            return client.tools.sendEmbed(message, {
                description: `bot isn't in a guild with that id`
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}