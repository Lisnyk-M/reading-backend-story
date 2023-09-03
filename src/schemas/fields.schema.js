const joi = require('joi');

const fieldsSchema = joi.array().max(2).items(joi.string().valid('description', 'links'));

module.exports = fieldsSchema;