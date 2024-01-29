const Joi = require('joi');
const Boom = require('boom');

const pokemonListValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().optional().description('Pokemon name; i.e. Bulbasaur')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const usersAddValidation = (data) => {

  const schema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    city: Joi.string().required()
  })

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
}


module.exports = {
  pokemonListValidation,
  usersAddValidation
};
