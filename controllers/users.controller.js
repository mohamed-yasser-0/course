const asyncWrapper = require('../middleware/asyncWrapper.js');
const User = require('../model/users.model.js');
const { SUCCESS, FAIL } = require('../utils/httpStatusText.js');
const appError = require('../utils/appError.js');
const bcrypt = require('bcryptjs');
const JWT = require('../utils/JWT.js');
const userRole = require('../utils/userRoles.js');


const allUser = asyncWrapper(async (req, res, next) => {
    const users = await User.find({}, { "__v": false })
    res.send({
        status: SUCCESS,
        data: { users }
    })
})
const logIn = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body
    if (!email && !password) {
        const error = appError.create('email and passsword are required', 400, FAIL)
        return next(error);
    }
    const myUser = await User.findOne({ email })
    const truePass = await bcrypt.compare(password, myUser.password);
    if (!truePass) {
        const error = appError.create('password is not true', 404, FAIL)
        return next(error);
    }
    const token = await JWT({ email: myUser.email, id: myUser._id ,role:myUser.role})

    res.send({
        status: SUCCESS,
        data: { token }
    })
})

const regester = asyncWrapper(async (req, res, next) => {
    const { name, email, password, role} = req.body
    console.log(req.file)
    const isMatch = await bcrypt.hash(password, 2)
    const user = {
        name,
        email,
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