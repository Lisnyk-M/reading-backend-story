const joi = require('joi');

// const storySchema = joi.object({
//     title: joi.string().required(),
//     description: joi.string().required().max(1000),
//     storyType: joi.string().required().max(100),
//     //images: joi.array().items(joi.string()),
// })

const storySchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required().max(1000),
    storyType: joi.string().required().max(100),
    images: joi.array().items(
        joi.object({
            location: joi.array().items(joi.number()).required(), // Ожидаем массив чисел для location
            src: joi.string().required(),
        })
    ),
});

module.exports = storySchema;

