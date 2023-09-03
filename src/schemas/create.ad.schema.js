const joi = require('joi');

const createAdSchema = joi.object({
    title: joi.string().required(),
    price: joi.number().required(),
    description: joi.string().required().max(1000),
    links: joi.array().max(3).items(joi.string()),
})

module.exports = createAdSchema;

