import mongoose from "mongoose";

const Schedule = new mongoose.Schema({
    title: {type: String, unique: true, required: true},
    description: {type: String},
    date: {type: Date},
    days: [
        {
            userId: {type: String},
            date: {type: Date},
            workShift: {type: String}
        }
    ]
});

export default mongoose.model('Schedule', Schedule);
