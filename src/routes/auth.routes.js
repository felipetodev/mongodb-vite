import { Router } from 'express'
import { login, register, profile } from '../controllers/auth.controller'
import { userExtractor } from '../middlewares/userExtractor'
const authRouter = Router()

authRouter.post('/auth/login', login)

authRouter.post('/auth/register', register)

authRouter.get('/auth/profile', userExtractor, profile)

export default authRouter
