const mongoose = require('mongoose');
const { Schema } = mongoose;

const adsSchema = Schema({
    title: {
        type: String,
        required: true,
        maxLength: 200,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxLength: 1000,
        trim: true,
    },
    links: [String],
    date: String,
})

const adsModel = new mongoose.model('ads', adsSchema);

module.exports = adsModel;