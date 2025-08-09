import { addToOrder } from '../data/orderRepository.js';

export async function addToUserOrder(req, res){
    try {
        const { userId } = req.params;
        await addToOrder(userId);
        res.status(200).json({"Success": true});
    } catch (error) {
        return res.status(400).json({success: false, error: error.message});
    }
}