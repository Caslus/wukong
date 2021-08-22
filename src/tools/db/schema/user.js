const mongoose = require("mongoose");

module.exports = mongoose.model("user", new mongoose.Schema({
    id: { type: String },
    registeredAt: { type: Number, default: Date.now() },
    blacklisted: { type: Boolean, default: false },
    bank: { type: Number, default: 100 },
    lastDaily: { type: Number, default: 0 }
}))