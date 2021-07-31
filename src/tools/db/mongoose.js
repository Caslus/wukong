const Discord = require("discord.js");
const config = require("./../../../config.json");
userSchema = require("./schema/user.js");
guildSchema = require("./schema/guild.js");
memberSchema = require("./schema/member.js");

module.exports.fetchUser = async function (key) {
    let userDB = await userSchema.findOne({ id: key });
    if (userDB) {
        return userDB;
    } else {
        userDB = new userSchema({
            id: key,
            registeredAt: Date.now()
        })
        await userDB.save().catch(err => console.log(err));
        return userDB;
    }
};

module.exports.fetchGuild = async function (key) {
    let guildDB = await guildSchema.findOne({ id: key });
    if (guildDB) {
        return guildDB;
    } else {
        guildDB = new guildSchema({
            id: key,
            registeredAt: Date.now()
        })
        await guildDB.save().catch(err => console.log(err));
        return guildDB;
    }
};

module.exports.fetchMember = async function (userID, guildID) {

    let memberDB = await memberSchema.findOne({ id: userID, guildID: guildID });
    if (memberDB) {
        return memberDB;
    } else {
        memberDB = new memberSchema({
            id: userID,
            guildID: guildID,
            registeredAt: Date.now()
        })
        await memberDB.save().catch(err => console.log(err));
        return memberDB;
    };
};