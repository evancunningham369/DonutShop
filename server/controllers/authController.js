import { insertUser, findUserByUsername } from "../data/authRepository.js";
import bcrypt from 'bcrypt';

export async function registerUser(req, res){
    const { username, password } = req.body;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async function(err, hash) {
        if (err){
            console.error(err);
            return res.status(500).json({message: "Hashing error"});
        }
        try{
            const response = await insertUser(username, hash);
            
            return res.status(200).json({success: true, userId: response.rows[0].insert_user ,username: username});
        }
        catch(error){
            
            return res.status(400).json({success: false, error: error.message});
        }
    })
}

export async function loginUser(req, res){
    const { username, password } = req.body;
    try {
        const result = await findUserByUsername(username);
        
        if(result.rowCount == 0){
            return res.status(400).json({message: "Username does not exist!"});
        }
        const hashPass = result.rows[0].hashed_password;
        
        const match = await bcrypt.compare(password, hashPass);
        if(!match){
            return res.status(400).json({message: "Incorrect password!"});
        }
            return res.status(200).json({userId: result.rows[0].user_id, username: username});

    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

export async function logoutUser(req, res){
    return res.status(200).json({});
}