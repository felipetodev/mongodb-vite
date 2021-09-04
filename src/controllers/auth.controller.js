import { User } from '../models'
import bcrypt from 'bcrypt'
import { userSchemaValidator } from '../helpers/schemaValidator'
import createError from 'http-errors'
import { signAccessToken } from '../helpers/signAccessToken'

export const login = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const {
      email: emailValidated,
      password: passwordValidated
    } = await userSchemaValidator.validateAsync({ email, password })

    // Match password
    const user = await User.findOne({ email: emailValidated })

    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(passwordValidated, user.passwordHash)

    // Just in case :P
    if (!(user && passwordCorrect)) {
      throw new Error('invalid email or password')
    }

    const userForToken = {
      id: user.id
    }

    const token = await signAccessToken(userForToken)

    res.json({ token })
  } catch (error) {
    if (error.isJoi) return next(createError.Unauthorized('User does not exists!'))
    next(error)
  }
}

export const register = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const {
      email: emailValidated,
      password: passwordValidated
    } = await userSchemaValidator.validateAsync({ email, password })

    const userFound = await User.findOne({ email: emailValidated })

    if (userFound) {
      res.statusMessage = 'User already exists'
      return res.status(400).json({ message: 'User already exists' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(passwordValidated, saltRounds)

    const user = new User({
      email: emailValidated,
      passwordHash
    })

    const savedUser = await user.save()
    const userForToken = {
      id: savedUser.id
    }

    const token = await signAccessToken(userForToken)
    res.json({ token })
  } catch (error) {
    if (error.isJoi) return next(createError(error.message))
    next(error)
  }
}

export const profile = async (req, res) => {
  const { userId } = req
  const user = await User.findById(userId)

  if (!user) return res.status(401).json({ message: 'User not found' })

  res.json(user)
}
