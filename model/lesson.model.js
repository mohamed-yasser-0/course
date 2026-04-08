const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    videoUrl: {
        type: String
    },
    duration: {
        type: Number // خليه Number عشان تقدر تحط ساعات أو دقائق بسهولة
    }
});

module.exports = mongoose.model('Lesson', lessonSchema);