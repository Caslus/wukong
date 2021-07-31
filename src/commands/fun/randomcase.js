module.exports = {
    name: "randomcase",
    description: "randomcaseDescription",
    usage: ["<prefix>randomcase <text>", "<prefix>randomcase yo dude this is some really cool text"],
    enabled: true,
    aliases: ["rc"],
    category: "general",
    memberPermissions: [],

    nsfw: false,
    dev: false,
    cooldown: 5000,

    async execute(client, message, args, data) {
        try {
            if (!args[0]) {
                return client.tools.sendEmbed(message, {
                    description: `${await client.tools.getLocale(message.guild.lang, "noArgs")}`
                });
            }
            function random(arr) {
                return arr[~~(Math.random() * arr.length)];
            }
            args = args.join(" ").replace(/\w/g, (ch) => {
                const fn = random([ch.toUpperCase, ch.toLowerCase]);
                return fn.apply(ch);
            })
            return client.tools.sendEmbed(message, {
                description: `\`${args}\``
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}