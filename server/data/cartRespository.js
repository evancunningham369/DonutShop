import fs from 'fs';
import pool from '../config/database.js';

const getCartSQL = fs.readFileSync('./sql/get_cart.sql').toString();
const addToCartSQL = fs.readFileSync('./sql/add_to_cart.sql').toString();
const getCartTotalSQL = fs.readFileSync('./sql/get_cart_total.sql').toString();

export async function getCart(userId){
    return pool.query(getCartSQL, [userId]);
}

export async function addToCart(userId, donutId, quantity){
    return pool.query(addToCartSQL, [userId, donutId, quantity]);
}

export async function getCartTotal(userId){
    return pool.query(getCartTotalSQL, [userId]);
}