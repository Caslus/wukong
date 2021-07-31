const mongoose = require("mongoose");
config = require("./../../../../config.json");

module.exports = mongoose.model("guild", new mongoose.Schema({
    id: { type: String },
    registeredAt: { type: Number, default: Date.now() },
    premium: { type: Boolean, default: false },
    prefix: { type: String, default: config.defaultPrefix },
    lang: { type: String, default: "en" }
}));