import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    cart: Array
});

const User = mongoose.model('user',userSchema);
export default User;