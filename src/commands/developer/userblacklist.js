module.exports = {
    name: "userblacklist",
    description: "userblacklistDescription",
    usage: ["<prefix>userblacklist <user id>", "<prefix>userblacklist 1234567812345678"],
    enabled: true,
    aliases: ["blacklistuser"],
    category: "developer",
    memberPermissions: [],

    nsfw: false,
    dev: true,
    cooldown: 1000,

    async execute(client, message, args, data) {
        try {
            if (!args[0]) {
                return client.tools.sendEmbed(message, {
                    description: `no user id specified`
                });
            }
            user = await client.db.fetchUser(args[0]);
            if (user) {
                if (user.id == message.author.id) {
                    return client.tools.sendEmbed(message, {
                        description: `you're not allowed to be that dumb`
                    });
                }
                user.blacklisted = !user.blacklisted;
                await user.save();
                return (client.tools.sendEmbed(message, {
                    title: `user blacklist status`,
                    description: `${user.blacklisted ? "👍" : "👎"}`
                }))
            }
            return client.tools.sendEmbed(message, {
                description: `invalid id`
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}