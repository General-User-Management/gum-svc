const Joi = require('joi')

module.exports = {
  operationValidation: async params => {
    const schema = Joi.object({
      method: Joi.string()
        .min(3)
        .max(30)
        .required(),
      args: Joi.array().required()
    })
    try {
      const value = await schema.validateAsync(params)
      return value
    } catch (err) {
      throw new Error(err.message)
    }
  },
  checkValidation: async params => {
    const schema = Joi.object({
      sub: Joi.string().required(),
      obj: Joi.string().required(),
      act: Joi.string().allow('GET', 'DELETE', 'POST', 'PUT', 'PATCH')
    })
    try {
      const value = await schema.validateAsync(params)
      return value
    } catch (err) {
      throw new Error(err.message)
    }
  }
}
