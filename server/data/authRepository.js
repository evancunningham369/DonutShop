import fs from 'fs';
import pool from '../config/database.js';

const insertUserSQL = fs.readFileSync('./sql/insert_user.sql').toString();
const selectUserByUsernameSQL = fs.readFileSync('./sql/select_user_by_username.sql').toString();

export async function createUser(username, hashedPassword){
    return pool.query(insertUserSQL, [username, hashedPassword]);
}

export async function findUserByUsername(username){
    return pool.query(selectUserByUsernameSQL, [username]);
}