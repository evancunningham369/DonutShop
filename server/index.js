import * as dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import express from 'express';
const app = express();
import cors from 'cors';
import { pool } from './config/database.js';

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const saltRounds = 5;
    bcrypt.hash(password, saltRounds, async function(err, hash) {
        try{
            const response = await pool.query(`SELECT insert_user($1, $2);`, [username, hash]);
            
            res.status(200).json({success: true, userId: response.rows[0].insert_user ,username: username});
        }
        catch(error){
            
            res.status(500).json({success: false, error: error.message});
        }
    })
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT user_id, hashed_password FROM account WHERE username= $1', [username]);
        
        if(result.rowCount == 0){
            res.status(500).json({message: "Username does not exist!"});
        }
        const hashPass = result.rows[0].hashed_password;
        
        const match = await bcrypt.compare(password, hashPass);
        if(!match){
            res.status(500).json({message: "Incorrect password!"});
        }
        else{
            
            res.status(200).json({userId: result.rows[0].user_id, username: username});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

app.post('/logout', async(req, res) => {
    res.status(200).send();
});

app.get('/donuts/:userId', async(req, res) => {
    try {
        const { userId } = req.params;
        
        const response = await pool.query(`SELECT * FROM get_donut_data($1)`, [userId]);
        
        res.status(200).send(response.rows);
    } catch (error) {
        
        console.error(error.message);
    }
});

app.get('/cart/:userId', async(req, res) => {
    try {
        const {userId} = req.params;
        const response = await pool.query(`SELECT * FROM get_cart($1)`, [userId]);
        
        res.status(200).json(response.rows);
    } catch (error) {
        console.error(error.message);        
    }
});

app.get('/cart/total/:userId', async(req, res) => {
    try {
        const {userId} = req.params;
        const response = await pool.query(`SELECT * FROM get_cart_total($1)`, [userId]);

        res.status(200).json(response.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

app.post('/add-to-cart', async (req, res) => {
    const { userId, donutId, quantity } = req.body;
    
    try {
        await pool.query(`CALL add_to_cart($1, $2, $3)`,
            [userId, donutId, quantity]
        );
        res.status(200).json({"Success": true});
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

app.post('/add-to-order/:userId', async(req, res) => {
    try {
        const { userId } = req.params;
        await pool.query(`CALL add_to_order($1)`, [userId]);
        res.status(200).json({"Success": true});
    } catch (error) {
        console.error("Error:", error.message);   
    }
})

app.listen("3001", () =>{
    console.log("Server running on port 3001");
});
