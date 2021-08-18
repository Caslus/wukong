module.exports = {
    name: "balance",
    description: "balanceDescription",
    usage: ["<prefix>balance", "<prefix>balance"],
    enabled: true,
    aliases: ["bank", "atm", "money"],
    category: "general",
    memberPermissions: [],

    nsfw: false,
    dev: false,
    cooldown: 3000,

    async execute(client, message, args, data) {
        try {
            return client.tools.sendEmbed(message, {
                description: `🍌 - ${await client.tools.getLocale(message.guild.lang, "balanceMsg", data.user.bank)}`
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}