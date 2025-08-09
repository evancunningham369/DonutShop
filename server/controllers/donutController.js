import { getAllDonuts } from "../data/donutRepository.js";

export async function handleGetAllDonuts(req, res){
    try {
            const { userId } = req.params;
            
            const response = await getAllDonuts(userId);
            
            return res.status(200).send(response.rows);
        } catch (error) {
            
            return res.status(400).json({success: false, error: error.message});
    
        }
}