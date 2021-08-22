module.exports = {
    name: "balance",
    description: "balanceDescription",
    usage: ["<prefix>balance <user>", "<prefix>balance @somereallycooluser"],
    enabled: true,
    aliases: ["bank", "atm", "money"],
    category: "economy",
    memberPermissions: [],

    nsfw: false,
    dev: false,
    cooldown: 3000,

    async execute(client, message, args, data) {
        try {
            let fetch = !args[0] ? null : await client.tools.resolveUser(args[0], client);
            let user = fetch ? fetch : message.author;

            if (user !== message.author) {
                data.user = await client.db.fetchUser(user.id);
                return client.tools.sendEmbed(message, {
                    description: `🍌 - ${await client.tools.getLocale(message.guild.lang, "balanceMentionMsg", user.username, data.user.bank)}`
                });
            }

            return client.tools.sendEmbed(message, {
                description: `🍌 - ${await client.tools.getLocale(message.guild.lang, "balanceMsg", data.user.bank)}`
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}