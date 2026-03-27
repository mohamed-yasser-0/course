const asyncWrapper = require('../middleware/asyncWrapper.js');
const Corse = require('../model/course.model.js');
const { SUCCESS, FAIL } = require('../utils/httpStatusText.js');
const appError = require('../utils/appError.js');

const getCourse = async (req, res) => {
    const courses = await Corse.find({}, { "__v": false });
    res.send({
        status: SUCCESS,
        data: { courses }
    })
}
const getSengleCourse = asyncWrapper(async (req, res, next) => {
    const course = await Corse.findById(req.params.id);
    if (!course) {
        const error = appError.create('course not found', 404, FAIL)
        return next(error);
    }
    res.json({
        status: SUCCESS,
        data: { courses: course }
    })
})
const postCourse = asyncWrapper(async (req, res, next) => {
    // if (!errors.isEmpty()) {
    //     const error = appError.create('invalid data', 400, FAIL);
    //     return next(error);
    // }
    const newCourse = new Corse(req.body);
    await newCourse.save()
    res.send({
        status: SUCCESS,
        data: { "post": newCourse }
    })
})
const updateCourse = async (req, res) => {
    // if (!errors.isEmpty()) {
    //     const error = appError.create('invalid data', 400, FAIL);
    //     return next(error);
    // }
    const courseId = req.params.id
    const updatedCourse = await Corse.findByIdAndUpdate(courseId, { $set: { ...req.body } }, { new: true });
    res.send({
        status: SUCCESS,
        data: { updatedCourse }
    })
}

const deleteCourse = asyncWrapper(async (req, res, next) => {
    const courseId = req.params.id
    const course = await Corse.findByIdAndDelete(courseId);

    if (!course) {
        const error = new Error('Course not found');
        error.statusCode = 404;
        return next(error);
    }

    res.json({
        status: 'SUCCESS',
        data: { courses: null }
    });
});

module.exports = { getCourse, getSengleCourse, deleteCourse, updateCourse, postCourse }