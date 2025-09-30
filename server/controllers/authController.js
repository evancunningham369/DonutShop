import { createUser, findUserByUsername } from "../data/authRepository.js";
import bcrypt from 'bcrypt';

export async function authRequired(req, res, next){
    if(req.session?.user) return next();
    return res.status(401).json({ message: 'Unauthorized' });
}

const SALT_ROUNDS = 10;

export async function legacy_registerUser(req, res){
    const { username, password } = req.body;
    
    bcrypt.hash(password, saltRounds, async function(err, hash) {
        if (err){
            console.error(err);
            return res.status(500).json({message: "Hashing error"});
        }
        try{
            const response = await createUser(username, hash);
            
            return res.status(200).json({success: true, userId: response.rows[0].insert_user ,username: username});
        }
        catch(error){
            
            return res.status(400).json({success: false, error: error.message});
        }
    })
}

export async function registerUser(req, res){
    const { username, password } = req.body;
    if(!username || !password) return res.status(400).json({ message: 'username and password are required' });
    
    const result = await findUserByUsername(username);
    const existing2 = {rows:[]};
    const existing = result?.rows[0];
    
    if (existing?.rows[0]) return res.status(409).json({ message: 'Username already taken' });

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const userId = await createUser({ username, hashedPassword: hash });

    // create session
    req.session.user = { userId, username };
    return res.status(201).json({ userId, username });
}

export async function loginUser(req, res){
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'username and password are required' });

    const user = await findUserByUsername(username);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.rows[0].hashed_password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    req.session.user = { userId: user.rows[0].user_id, username: username };
    return res.status(200).json({ userId: user.rows[0].user_id, username });
}

export async function logoutUser(req, res){
    req.session.destroy(() => {
        res.clearCookie(process.env.COOKIE_NAME || 'sid');
        return res.status(200).json({ message: 'Logged out'});
    });
}

export async function me(req, res){
    if (!req.session?.user) return res.status(401).json({ message: 'Unauthorized' });
    return res.status(200).json(req.session.user);
}