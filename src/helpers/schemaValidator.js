import Joi from 'joi'

const userSchemaValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(30)
})

export { userSchemaValidator }
