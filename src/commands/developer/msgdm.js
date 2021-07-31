module.exports = {
    name: "msgdm",
    description: "msgDmDescription",
    usage: ["<prefix>msgdm <user id> <message>", "<prefix>msgdm 1234567812345678 hey there"],
    enabled: true,
    aliases: [],
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
            let user = client.users.cache.get(args[0]);
            args.shift();
            let text = args.join(" ");
            try {
                user.send(text);
                return client.tools.sendEmbed(message, {
                    description: `sent message to ${user.username}`
                });
            }
            catch {
                return client.tools.sendEmbed(message, {
                    description: `couldn't send message`
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}