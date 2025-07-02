import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userModel = mongoose.Schema(
    {

        name:{
            type: String,
            req: true
        },
        email:{
            type: String,
            unique: true,
            req: true
        },
        mobile:{
            type: Number,
            req: true
        },
        password:{
            type: String,
            req: true
        },
        pic:{
            type: String,
            default: 'https://cdn.vectorstock.com/i/preview-1x/21/23/avatar-photo-default-user-icon-person-image-vector-47852123.jpg'
        },
    }
)

userModel.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userModel.pre('save', async function (next) {
    if(!this.isModified){
        return next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model('User', userModel);
export default User;