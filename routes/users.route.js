const express = require('express')
const { logIn, regester, allUser } = require('../controllers/users.controller.js');
const verifyToken = require('../middleware/verifyToken.js');
const router = express.Router();

const multer = require('multer');
const appError = require('../utils/appError.js');

const diskStorage = multer.diskStorage({
    destination: function (req,file, cb){
        console.log('file',file);
        cb(null,'uploads');
    }
    ,filename: function(req, file, cb){
        const ext = file.mimetype.split('/')[1]
        const fileName = `user-${Date.now()}.${ext}`
        cb(null,fileName)
    }
})

const fileFilter = (req, file, cd) =>{
    const imgeType = file.mimetype.split('/')[0];

    if(imgeType === 'image'){
        return cb(null,true)
    } else {
        return cd(appError.create('file must be an image',400),false)
    }
}

const upload = multer({ storage: diskStorage, fileFilter})

router.route('/')
    .get(verifyToken, allUser)
router.route('/logIn')
    .post(logIn)
router.route('/regester')
    .post(upload.single('avatar'), regester)

router

module.exports = router