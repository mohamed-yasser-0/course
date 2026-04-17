const mongoose = require("mongoose");

const daysSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        unique: true // 🔥 يمنع تكرار نفس اليوم
    },
    students: [
        {
            studentId: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            grades: {
                listen: {
                    type: Number,
                    default: 0
                },
                speak: {
                    type: Number,
                    default: 0
                },
                bonus: {
                    type: Number,
                    default: 0
                }
            }
        }
    ]
}, { timestamps: true }); // 🔥 يضيف createdAt و updatedAt


module.exports = mongoose.model("Daye", daysSchema);

