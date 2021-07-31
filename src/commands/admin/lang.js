module.exports = {
    name: "lang",
    description: "langDescription",
    usage: ["<prefix>lang <language code>", "<prefix>lang en"],
    enabled: true,
    aliases: ["setlang"],
    category: "admin",
    memberPermissions: ["ADMINISTRATOR"],

    nsfw: false,
    dev: false,
    cooldown: 5000,

    async execute(client, message, args, data) {
        try {
            if (!args[0]) { // change to show available languages
                let locale = JSON.parse(require('fs').readFileSync('./src/locale.json'))
                let languages = [];
                for (var language in locale) {
                    languages.push(`${language} - ${await client.tools.getLocale(language.toString(), "language")}`);
                }
                return client.tools.sendEmbed(message, {
                    description: `${await client.tools.getLocale(message.guild.lang, "langsAvailable") + '\n```' + languages.join("\n") + '```'}`,
                });
            }
            let lang = args.join(" ");
            data.guild.lang = lang;
            await data.guild.save();
            message.guild.lang = lang.toLowerCase();
            return client.tools.sendEmbed(message, {
                title: `${await client.tools.getLocale(message.guild.lang, "updatedLang")}`,
                description: `${await client.tools.getLocale(message.guild.lang, "language")}`
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}