const express = require('express')
const { getDayes, getSengleDayes, deleteDayse, updateDayse, postDayse }
    = require('../controllers/Dayes.controller.js');
const userRole = require('../utils/userRoles.js');
const allowedTo = require('../middleware/allowedTo.js');
const verifyToken = require('../middleware/verifyToken.js');
const router = express.Router();
router.route('/')
    .get(verifyToken, getDayes)
    .post(verifyToken, allowedTo(userRole.ADMIN), postDayse)
router.route('/:id')
    .get(verifyToken, getSengleDayes)
    .patch(verifyToken, allowedTo(userRole.ADMIN), updateDayse)
    .delete(verifyToken, allowedTo(userRole.ADMIN), deleteDayse)
module.exports = router