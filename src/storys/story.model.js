const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
    location: {
        type: [Number],
        required: true,
    },
    src: {
        type: String,
        required: true,
    },
});

const storySchema = Schema({
    title: {
        type: String,
        required: true,
        maxLength: 200,
    },
    description: {
        type: String,
        required: true,
        maxLength: 5000,
        trim: true,
    },
    storyType: {
        type: String,
        required: true,
        maxLength: 100
    },
    images: [imageSchema],
    date: String,
})

const storyModel = new mongoose.model('story', storySchema);

module.exports = storyModel;