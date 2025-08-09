import fs from 'fs';
import pool from '../config/database.js';

const getAllDonutsSQL = fs.readFileSync('./sql/get_all_donuts.sql').toString();

export async function getAllDonuts(userId){
    return pool.query(getAllDonutsSQL, [userId]);
}