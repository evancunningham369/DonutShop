import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    username: String,
    cart: Array,
    total: Number,
    orderDate: String
});

const Order = mongoose.model('order', orderSchema);

export default Order;