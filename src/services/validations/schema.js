const Joi = require('joi');

const dataSalesSchema = Joi.object({
  productId: Joi.required().label('productId'),
  quantity: Joi.number().positive().required().label('quantity'),
}).messages({
  'number.positive': 'QUANTITY_INVALID',
  'any.required': '{#label}',
});

module.exports = { dataSalesSchema };