const express = require('express')
const { getSengleCourse, getCourse, postCourse, updateCourse, deleteCourse } = require('../controllers/courses.controller.js');
const userRole = require('../utils/userRoles.js');
const allowedTo = require('../middleware/allowedTo.js');
const verifyToken = require('../middleware/verifyToken.js');
const router = express.Router();
router.route('/')
    .get(getCourse)
    .post(postCourse)
router.route('/:id')
    .get(getSengleCourse)
    .patch(updateCourse)
    .delete(verifyToken,allowedTo(userRole.ADMIN), deleteCourse)
router

module.exports = router