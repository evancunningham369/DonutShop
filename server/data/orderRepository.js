import fs from "fs";
import pool from "../config/database.js";

const addToOrderSQL = fs.readFileSync('./sql/add_to_order.sql').toString();

export async function addToOrder(userId){
    return pool.query(addToOrderSQL, [userId]);
}