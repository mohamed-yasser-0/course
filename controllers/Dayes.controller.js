const asyncWrapper = require('../middleware/asyncWrapper.js');
const Daye = require('../model/Dayes.model.js');
const { SUCCESS, FAIL } = require('../utils/httpStatusText.js');
const appError = require('../utils/appError.js');

const getDayes = asyncWrapper(async (req, res) => {

    const days = await Daye.find({}, { "__v": false });

    res.send({
        status: SUCCESS,
        data: { days }
    });

});
const getSengleDayes = asyncWrapper(async (req, res, next) => {
    const Dayse = await Daye.findById(req.params.id);
    if (!Dayse) {
        const error = appError.create('Dayse not found', 404, FAIL)
        return next(error);
    }
    res.json({
        status: SUCCESS,
        data: { day: Dayse }
    });
})
const postDayse = asyncWrapper(async (req, res, next) => {
    // if (!errors.isEmpty()) {
    //     const error = appError.create('invalid data', 400, FAIL);
    //     return next(error);
    // }
    try {
        const newDayse = new Daye(req.body);
        await newDayse.save();

        res.send({
            status: SUCCESS,
            data: { post: newDayse }
        });

    } catch (err) {

        if (err.code === 11000) {
            return res.status(400).send({
                status: "FAILED",
                message: "اليوم ده متسجل قبل كده ❌"
            });
        }

        res.status(500).send({
            status: "ERROR",
            message: "حصل خطأ في السيرفر"
        });
    }
})
const updateDayse = async (req, res) => {
    // if (!errors.isEmpty()) {
    //     const error = appError.create('invalid data', 400, FAIL);
    //     return next(error);
    // }
    const DayseId = req.params.id
    const updatedDayse = await Daye.findByIdAndUpdate(DayseId, { $set: { ...req.body } }, { new: true });
    res.send({
        status: SUCCESS,
        data: { updatedDayse }
    })
}

const deleteDayse = asyncWrapper(async (req, res, next) => {
    const DayseId = req.params.id
    const Dayse = await Daye.findByIdAndDelete(DayseId);

    if (!Dayse) {
        const error = new Error('Dayse not found');
        error.statusCode = 404;
        return next(error);
    }

    res.json({
        status: 'SUCCESS',
        data: { Dayses: null }
    });
});

module.exports = { getDayes, getSengleDayes, deleteDayse, updateDayse, postDayse }