module.exports = {
    name: "enchantify",
    description: "enchantifyDescription",
    usage: ["<prefix>enchantify <text>", "<prefix>enchantify yo dude this is some really cool text"],
    enabled: true,
    aliases: ["enchant"],
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
            args = args.join(" ");
            args = await client.tools.normalizeString(args);
            args = args.replace(/a/gi, "ᔑ")
                .replace(/b/gi, "ʖ")
                .replace(/c/gi, "ᓵ")
                .replace(/d/gi, "↸")
                .replace(/e/gi, "ᒷ")
                .replace(/f/gi, "⎓")
                .replace(/g/gi, "⊣")
                .replace(/h/gi, "⍑")
                .replace(/i/gi, "╎")
                .replace(/j/gi, "⋮")
                .replace(/k/gi, "ꖌ")
                .replace(/l/gi, "ꖎ")
                .replace(/m/gi, "ᒲ")
                .replace(/n/gi, "リ")
                .replace(/o/gi, "𝙹")
                .replace(/p/gi, "!¡")
                .replace(/q/gi, "ᑑ")
                .replace(/r/gi, "∷")
                .replace(/s/gi, "ᓭ")
                .replace(/t/gi, "ℸ ̣")
                .replace(/u/gi, "⚍")
                .replace(/v/gi, "⍊")
                .replace(/w/gi, "∴")
                .replace(/x/gi, "·/")
                .replace(/y/gi, "||")
                .replace(/z/, "⨅");
            return client.tools.sendEmbed(message, {
                description: `\`${args}\``
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}