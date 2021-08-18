const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');

module.exports = {
    name: "profile",
    description: "profileDescription",
    usage: ["<prefix>profile <mention>", "<prefix>profile @somereallycooluser"],
    enabled: true,
    aliases: ["userprofile", "pr"],
    category: "general",
    memberPermissions: [],

    nsfw: false,
    dev: false,
    cooldown: 5000,

    async execute(client, message, args, data) {

        const applyText = (canvas, text, fontSize) => {
            const context = canvas.getContext('2d');

            do {
                context.font = `${fontSize -= 10}px sans serif`;
            } while (context.measureText(text).width > canvas.width - 250);

            return context.font;
        }

        try {
            let member = !args[0] ? null : await client.tools.resolveMember(args[0], message.guild);
            let user = (!args[0] || !member) ? message.author : member.user;

            const canvas = Canvas.createCanvas(600, 250);
            const context = canvas.getContext('2d');

            // background
            // make user able to choose this background here
            const background = await Canvas.loadImage('./src/media/backgrounds/blueBricks.png');
            context.drawImage(background, 0, 0, canvas.width, canvas.height);

            // background overlay
            // make user able to switch between light and dark theme
            const backgroundoverlay = await Canvas.loadImage('./src/media/profile-card-background-dark.png')
            context.drawImage(backgroundoverlay, 0, 0, canvas.width, canvas.height);

            // avatar circle
            const avatarCircle = await Canvas.loadImage('./src/media/profile-avatar-circle.png')
            context.drawImage(avatarCircle, 0, 0, canvas.width, canvas.height);

            // name decoration
            const nameDecoration = await Canvas.loadImage('./src/media/profile-name-decoration.png')
            context.drawImage(nameDecoration, 0, 0, canvas.width, canvas.height);

            // username
            context.font = applyText(canvas, user.username, 60);
            context.fillStyle = '#ffffff';
            context.fillText(user.username, canvas.width / 2.5, canvas.height / 3.5);

            // user id
            context.font = applyText(canvas, `id: ${user.id}`, 25);
            context.fillStyle = '#ffffff';
            context.fillText(`id: ${user.id}`, 5, canvas.height - 5);


            // bank
            if (!user.bot) {
                const bankIcon = await Canvas.loadImage('./src/media/profile-bank-icon.png')
                context.drawImage(bankIcon, 0, 0, canvas.width, canvas.height);
                context.font = applyText(canvas, `B$${data.user.bank}`, 40);
                context.fillStyle = '#ffffff';
                context.fillText(`B$${data.user.bank}`, canvas.width / 2.13, canvas.height / 2.2);
            }
            else {
                context.font = applyText(canvas, `[BOT]`, 40);
                context.fillStyle = '#ffffff';
                context.fillText(`[BOT]`, canvas.width / 2.5, canvas.height / 2.2);
            }

            // using save and restore so new elements arent limited to the circle mask
            context.save();

            // circle mask for avatar
            context.beginPath();
            context.arc(125, 125, 100, 0, Math.PI * 2, true);
            context.closePath();
            context.clip();

            // avatar
            const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'png', size: 512 }));
            context.drawImage(avatar, 25, 25, 200, 200)

            context.restore();

            // ----------- BADGES ------------
            // bot
            if (user.bot) {
                const botBadge = await Canvas.loadImage('./src/media/profile-bot-badge.png')
                context.drawImage(botBadge, 0, 0, canvas.width, canvas.height);
            }
            // dev
            if (user.id == client.config.ownerID) {
                const devBadge = await Canvas.loadImage('./src/media/profile-dev-badge.png')
                context.drawImage(devBadge, 0, 0, canvas.width, canvas.height);
            }

            // some light or something
            const topLight = await Canvas.loadImage('./src/media/profile-card-light.png')
            context.drawImage(topLight, 0, 0, canvas.width, canvas.height);

            const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-card.png');

            return message.channel.send({ files: [attachment] });

        }
        catch (err) {
            console.log(err);
        }
    }
}