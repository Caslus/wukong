module.exports = {
    name: "calc",
    description: "calcDescription",
    usage: ["<prefix>calc <math expression>", "<prefix>calc floor(pi*5)"],
    enabled: true,
    aliases: ["math"],
    category: "general",
    memberPermissions: [],

    nsfw: false,
    dev: false,
    cooldown: 2500,

    async execute(client, message, args, data) {
        try {
            if (!args[0]) {
                return client.tools.sendEmbed(message, {
                    description: `${await client.tools.getLocale(message.guild.lang, "noArgs")}`
                });
            }
            return client.tools.sendEmbed(message, {
                title: `${await client.tools.getLocale(message.guild.lang, "mathResponse")}`,
                description: `${await client.tools.calc(args.join(" "))}`
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}