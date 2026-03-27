const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    duration: {
        type: String,        // مثال: "42 hours"
        required: true
    },
    studentsEnrolled: {
        type: Number,
        default: 0
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    },
    status: {
        type: String,
        enum: ['Enrolled', 'Not Enrolled', 'Completed'],
        default: 'Not Enrolled'
    },
    image: {
        type: String,        
        default: null
    }
}, { 
    timestamps: true   // هيضيف createdAt و updatedAt تلقائي
});

module.exports = mongoose.model('Corse', courseSchema);