const express = require('express')
const { getSengleCourse, getCourse, postCourse, postLesson, updateCourse, deleteCourse, getLessons } = require('../controllers/courses.controller.js');
const userRole = require('../utils/userRoles.js');
const allowedTo = require('../middleware/allowedTo.js');
const verifyToken = require('../middleware/verifyToken.js');
const router = express.Router();
router.route('/')
    .get(verifyToken, getCourse)
    .post(verifyToken, allowedTo(userRole.ADMIN), postCourse)
router.route('/:id')
    .get(verifyToken, getSengleCourse)
    .patch(verifyToken,allowedTo(userRole.ADMIN), updateCourse)
    .delete(verifyToken, allowedTo(userRole.ADMIN), deleteCourse)
router.route('/:id/lessons')
    .get(verifyToken, getLessons)
    .post(verifyToken,allowedTo(userRole.ADMIN), postLesson)

module.exports = router