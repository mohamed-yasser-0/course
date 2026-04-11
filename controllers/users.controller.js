const asyncWrapper = require('../middleware/asyncWrapper.js');
const User = require('../model/users.model.js');
const { SUCCESS, FAIL } = require('../utils/httpStatusText.js');
const appError = require('../utils/appError.js');
const bcrypt = require('bcryptjs');
const JWT = require('../utils/JWT.js');
const userRole = require('../utils/userRoles.js');


    const allUser = asyncWrapper(async (req, res, next) => {
        console.log(req.decodedToken.id)
        const id = req.decodedToken.id
        
        const user = await User.findById(id);
        if (!user) {
            const error = appError.create('course not found', 404, FAIL)
            return next(error);
        }
        
        res.send({
            status: SUCCESS,
            data: { user }
        })
    })
const logIn = asyncWrapper(async (req, res, next) => {
    const { phone, password } = req.body
    if (!phone || !password) {
        const error = appError.create('phone and password are required', 400, FAIL)
        return next(error);
    }
    const myUser = await User.findOne({ phone })
    const truePass = await bcrypt.compare(password, myUser.password);
    if (!truePass) {
        const error = appError.create('password is not true', 404, FAIL)
        return next(error);
    }
    const token = await JWT({ phone: myUser.phone, id: myUser._id, role: myUser.role })

    res.send({
        status: SUCCESS,
        data: { token }
    })
})

const regester = asyncWrapper(async (req, res, next) => {
    const { name, phone, password, role } = req.body
    console.log(req.file)
    const isMatch = await bcrypt.hash(password, 2)
    const user = {
        name,
        phone,
        password: isMatch,
        role,
        avatar: req.file,
    }
    const newUser = new User(user);

    // // genrate JWT token
    // const token = JWT({ email: newUser.email, id: newUser._id })
    // newUser.token = token

    await newUser.save()
    res.send({
        status: SUCCESS,
        data: { "post": newUser }
    })
})


module.exports = { logIn, regester, allUser }