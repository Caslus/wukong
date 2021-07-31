module.exports = {
    name: "server",
    description: "serverDescription",
    usage: ["<prefix>server", "<prefix>server"],
    enabled: true,
    aliases: ["support"],
    category: "general",
    memberPermissions: [],

    nsfw: false,
    dev: false,
    cooldown: 5000,

    async execute(client, message, args, data) {
        try {
            return client.tools.sendEmbed(message, {
                description: `${await client.tools.getLocale(message.guild.lang, "serverInviteDescription", client.config.serverUrl)}`
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}