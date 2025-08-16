import { getCart, getCartTotal, addToCart } from "../data/cartRespository.js";

export async function getUserCart(req, res){
    try {
        const { userId } = req.session.user;
        const response = await getCart(userId)
        
        return res.status(200).json(response.rows);
    } catch (error) {
        return res.status(400).json({success: false, error: error.message});      
    }
}

export async function addToUserCart(req, res){
    const { donutId, quantity } = req.body;
    const { userId } = req.session.user;
    try {
        await addToCart(userId, donutId, quantity);
        return res.status(200).json({"Success": true});
    } catch (error) {
        return res.status(500).json({"Error": error.message});
    }
}

export async function getUserCartTotal(req, res){
    try {
        const { userId } = req.session.user;
        const response = await getCartTotal(userId);
        return res.status(200).json(response.rows[0]);
    } catch (error) {
        return res.status(400).json({success: false, error: error.message});
    }
}