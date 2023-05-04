import * as dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import express from 'express';
const app = express();
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/Users.js';
import Order from './models/Order.js';
import * as db from './donutDB.js';

app.use(express.json());
app.use(cors());

mongoose.connect(`mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.aethefr.mongodb.net/donutShopDB`)
.then(() => console.log("Successfully connected to Database"))
.catch((err) => console.log("Error:", err));

app.get('/', (req, res) => {
    User.find({}).then((users) => {
        res.send(users);
    });
});

app.get('/orders', (req, res) => {
    Order.find({}).then((orders) => res.send(orders));
})

app.post('/cart', async(req, res) => {
    const { username } = req.body;

    let user = await User.findOne({username}, 'cart');
    res.send(user.cart);
})

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const saltRounds = 5;
    bcrypt.hash(password, saltRounds, async function(err, hash) {
        const response = await db.addUser(username, hash);
        res.send(response);
    })
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const response = await db.loginUser(username, password);
    res.send(response);
})

app.post('/add-order', async (req, res) => {
    const { user } = req.body;
    const response = await db.addOrder(req.body);
    db.emptyUserCart(user);
    
    res.send(response);
});

app.post('/add-to-cart', async (req, res) => {
    const response = await db.addToCart(req.body);
    res.send(response);
});

app.post('/empty-cart', (req, res) => {
    const { username } = req.body;

    db.emptyUserCart(username);

    res.send(`User ${username}'s cart is empty`);
})


app.listen("3001", () =>{
    console.log("Server running on port 3001");
});
