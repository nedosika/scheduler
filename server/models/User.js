import mongoose from "mongoose";

const User = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    firstname: {type: String},
    secondname: {type: String},
    surname: {type: String},
    avatar: {type: String},
    description: {type: String},
    roles: [{type: String, ref: 'Role'}]
});

export default mongoose.model('User', User);
