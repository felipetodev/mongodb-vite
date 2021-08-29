import { User } from '../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'

export const login = async (req, res) => {
  const { email, password } = req.body

  // Match password
  const user = await User.findOne({ email })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    res.status(401).json({
      error: 'invalid email or password'
    })
  }

  const userForToken = {
    id: user._id
  }

  jwt.sign(userForToken, JWT_SECRET, (err, token) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.json({ token })
    }
  })
}

export const register = async (req, res) => {
  const { email, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    email,
    passwordHash
  })

  const userFound = await User.findOne({ email })
  if (userFound) {
    res.statusMessage = 'User already exists'
    return res.status(400).json({ message: 'User already exists' })
  }

  const savedUser = await user.save()
  const userForToken = {
    id: savedUser._id
  }

  jwt.sign(userForToken, JWT_SECRET, (err, token) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.json({ token })
    }
  })
}

export const profile = async (req, res) => {
  const { userId } = req
  const user = await User.findById(userId)

  if (!user) return res.status(401).json({ message: 'User not found' })

  res.json(user)
}
