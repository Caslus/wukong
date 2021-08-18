const { number } = require("mathjs");

module.exports = {
    name: "editbalance",
    description: "editbalanceDescription",
    usage: ["<prefix>editbalance <user id> <amount>", "<prefix>editbalance 1234567812345678 -500"],
    enabled: true,
    aliases: ["addbal"],
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
            if (!args[1]) {
                return client.tools.sendEmbed(message, {
                    description: `no amount specified`
                });
            }
            if (Number.isInteger(parseInt(args[1]))) {
                user = await client.db.fetchUser(args[0]);
                if (user) {
                    oldBank = user.bank
                    user.bank += parseInt(args[1])
                    await user.save();
                    return (client.tools.sendEmbed(message, {
                        title: `balance modified for id ${user.id}`,
                        description: `old balance: ${oldBank}\nnew balance: ${user.bank}`
                    }))
                }
                return client.tools.sendEmbed(message, {
                    description: `invalid id`
                });
            }
            else {
                return client.tools.sendEmbed(message, {
                    description: `invalid amount`
                });
            }

        }
        catch (err) {
            console.log(err);
        }
    }
}