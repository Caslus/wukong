module.exports = {
    name: "avatar",
    description: "avatarDescription",
    usage: ["<prefix>avatar <mention>", "<prefix>avatar @somereallycooluser"],
    enabled: true,
    aliases: ["pfp", "picture", "icon"],
    category: "general",
    memberPermissions: [],

    nsfw: false,
    dev: false,
    cooldown: 5000,

    async execute(client, message, args, data) {
        try {
            let member = !args[0] ? null : await client.tools.resolveMember(args[0], message.guild);
            let user = (!args[0] || !member) ? message.author : member.user;
            return client.tools.sendEmbed(message, {
                description: `${await client.tools.getLocale(message.guild.lang, "avatarResponse", user.username)}`,
                image: { url: `${user.displayAvatarURL({ dynamic: true, size: 2048, format: 'png' })}` }
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}