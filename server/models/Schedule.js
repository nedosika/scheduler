import mongoose from "mongoose";

const Schedule = new mongoose.Schema({
    title: {type: String, unique: true, required: true},
    desc: {type: String},
    days: [
        {
            userId: {type: String},
            date: {type: Date},
            workShift: {type: String}
        }
    ]
});

export default mongoose.model('Schedule', Schedule);
