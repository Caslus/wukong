const mongoose = require("mongoose");

module.exports = mongoose.model("member", new mongoose.Schema({
    id: { type: String },
    guild: { type: String },
    registeredAt: { type: Number, default: Date.now() },
}))