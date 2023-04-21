import User from "./models/Users.js";
import Order from "./models/Order.js";

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
    let userFound = false;
    let response = {};

    let user = await User.find({username});
    userFound = user.length !== 0;
    
    if(userFound){
        if (user[0].password === password){
            response = {
                user: user[0],
                success: true,
                message: "User logged in",}
        }
        else {
            response = {
                success: false,
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

    let user = await User.findOneAndUpdate({username: username}, { $push: { cart: donut } });

    if(!user.isNew){
        response = {
            success: true,
            message: `${donut.name} donut added to cart`,
        }
    }
    return response;
}