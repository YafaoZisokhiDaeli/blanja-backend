const createError = require('http-errors')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const usersModel = require('../models/user')
const commonsHelper = require('../helper/common')
const authHelper = require('../helper/auth')
const jwt = require('jsonwebtoken')


const userController = {
    registrasi: async (request, response, next) => {
        try {
            const { email, password, fullname, role } = request.body;
            const { rows: [emailNumber] } = await usersModel.findEmail(email)
            const passwordHash = bcrypt.hashSync(password)
            const id = uuidv4()
            if (emailNumber) {
                return next(createError(403, "Email is already used"))
            }
            const data = {
                id,
                email,
                password: passwordHash,
                fullname,
                role
            }
            console.log(data)
            usersModel.create(data)
                .then(
                    result => commonsHelper.response(response, result.rows, 201, "You have crated a New Account!")
                )
                .catch(error => response.send(error)
                )
        } catch (error) {
            console.log(error);
        }
    },
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body
            const { rows: [user] } = await usersModel.findEmail(email)
            if (!user) {
                return commonsHelper.response(res, null, 403, 'Email is invalid')
            }
            const isValidPassword = bcrypt.compareSync(password, user.password)
            console.log(isValidPassword);

            if (!isValidPassword) {
                return commonsHelper.response(res, null, 403, 'Password invalid')
            }
            delete user.password
            const payload = {
                email: user.email,
                role: user.role
            }
            user.token = authHelper.generateToken(payload)
            user.refreshToken = authHelper.generateRefreshToken(payload)

            commonsHelper.response(res, user, 201, 'Login successful')
        } catch (error) {
            console.log(error);
        }
    },
    profile: async (req, res, next) => {
        const email = req.payload.email
        const { rows: [user] } = await usersModel.findEmail(email)
        delete user.password
        commonsHelper.response(res, user, 200)
    },
    refreshToken: (req, res) => {
        const refreshToken = req.body.refreshToken
        const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_JWT)
        const payload = {
            email: decoded.email,
            role: decoded.role
        }
        const result = {
            token: authHelper.generateToken(payload),
            refreshToken: authHelper.generateRefreshToken(payload)
        }
        commonsHelper.response(res, result, 200)

    }
}

module.exports = userController