const mongoose = require('mongoose');
const userRole = require('../utils/userRoles');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,   // لازم الاسم يكون موجود
        trim: true        // يشيل الفراغات قبل وبعد الاسم
    },
    phone: {
        type: String,
        required: true,      // لو التليفون مطلوب فعلاً
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [userRole.USER, userRole.ADMIN],  // تقدر تحدد أدوار
        default: userRole.USER
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    token: {
        type: String
    },
    avatar: {
        type: String,
        default: 'uploads/profile.png'
    }
});

module.exports = mongoose.model('User', userSchema);