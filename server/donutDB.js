import User from "./models/Users.js";
import Order from "./models/Order.js";
import bcrypt from 'bcrypt';

export async function emptyUserCart(user){
    await User.findOneAndUpdate({username: user}, {cart: []});
}

export function addOrder(body){
    const {user, cart, total, orderDate} = body;
    let response = {};
    const newOrder = new Order({
        username: user,
        cart: cart,
        total: total,
        orderDate: orderDate,
    });

    newOrder.save();
    response = {
        success: true,
        message: "Order Submitted",
    }
    return response;
}

export async function addUser(username, password){
    let response = {};

    const cart = [{}];
    const newUser = new User({
        username: username,
        password: password,
        cart: cart
    });

    let user = await User.find({username});
    let userNotFound = user.length === 0;

    if (userNotFound){
        newUser.save();
        response = {
            user: newUser,
            success: true,
            message: "Registered User"
        }
    }
    else{
        response = {
            success: false,
            message: "User with that name already exists!"
        }
    }
    return response;
}

export async function loginUser(username, password){
    let response = {};

    let user = await User.findOne({username});
    
    if(user){
        const match = await bcrypt.compare(password, user.password);

        if(match){
            response = {
                user: user,
                success: match,
                message: "User logged in",}
        }
        else {
            response = {
                success: match,
                message: "Incorrect password",
            }
        }
    }
    else{
        response = {
            success: false,
            message: "User not found",
        }
    }
    return response;
}

export async function addToCart(body){
    const { username, donut } = body;
    let response = {};
    let hasDonut = await User.countDocuments({username: username, 'cart.name': donut.name});
    
    if(hasDonut > 0){
        await User.findOneAndUpdate({username: username, 'cart.name': donut.name}, {$set: {'cart.$.quantity': donut.quantity, 'cart.$.total': donut.total}});
        
        if(donut.quantity === 0){
            await User.updateOne({username}, {
                $pull: {
                    cart: {name: donut.name}
                },
            });
        }
    } else{
        await User.findOneAndUpdate({username: username}, {$push : {cart: donut}});
    }

    response = {
        success: true,
        message: `${donut.name} donut added to cart`,
    }
    return response;
}