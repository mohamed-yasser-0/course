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
    const { phone, password } = req.body;

    // التحقق من الإدخال
    if (!phone || !password) {
        const error = appError.create('رقم الهاتف وكلمة المرور مطلوبين', 400, FAIL);
        return next(error);
    }

    // جلب اليوزر
    const myUser = await User.findOne({ phone }).select('+password'); // لو كنت مخبي الـ password في الـ schema

    if (!myUser) {
        // رسالة عامة للأمان (مش بنقول إن الرقم مش موجود)
        const error = appError.create('رقم الهاتف أو كلمة المرور غير صحيحة', 401, FAIL);
        return next(error);
    }

    // مقارنة كلمة المرور
    const isPasswordCorrect = await bcrypt.compare(password, myUser.password);

    if (!isPasswordCorrect) {
        const error = appError.create('رقم الهاتف أو كلمة المرور غير صحيحة', 401, FAIL);
        return next(error);
    }
const token = await JWT({ phone: myUser.phone, id: myUser._id, role: myUser.role })

    // Response ناجح
    res.status(200).json({
        status: SUCCESS,
        message: "تم تسجيل الدخول بنجاح",
        data: { 
            token,
            user: {
                id: myUser._id,
                studentId:myUser.phone,
                name:myUser.name,
                role:myUser.role,
                createdAt:myUser.createdAt,
                avatar:myUser.avatar
            }
        }
    });
});

const regester = asyncWrapper(async (req, res, next) => {
  try {
    const { name, phone, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      name,
      phone,
      password: hashedPassword,
      role,
      avatar: req.file,
    };

    const newUser = new User(user);
    await newUser.save();

    res.send({
      status: SUCCESS,
      data: { post: newUser },
    });

  } catch (error) {

    if (error.code === 11000) {
      return res.status(400).json({
        message: "رقم الهاتف مستخدم بالفعل"
      });
    }

    next(error); // باقي الأخطاء تروح للميدل وير
  }
});


module.exports = { logIn, regester, allUser }