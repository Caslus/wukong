module.exports = {
    name: "invite",
    description: "inviteCmdDescription",
    usage: ["<prefix>invite", "<prefix>invite"],
    enabled: true,
    aliases: [],
    category: "general",
    memberPermissions: [],

    nsfw: false,
    dev: false,
    cooldown: 5000,

    async execute(client, message, args, data) {
        try {
            return client.tools.sendEmbed(message, {
                description: `${await client.tools.getLocale(message.guild.lang, "inviteDescription", client.config.inviteUrl)}`
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}