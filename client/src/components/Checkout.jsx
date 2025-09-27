import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, getCartTotal, addToOrder } from '../fetch_req';
import Header from "./Header";
import Footer from "./Footer";
import { useUser } from "../context/UserContext.jsx";

export default function Checkout(){
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const { user } = useUser();

    useEffect(() => {
        const fetchCart = async() => {
            try {
                const response = await getCart(user.userId);
                                
                setCart(await response);
            } catch (error) {
                console.error("Error:", error);
            }
        }
        const fetchTotal = async() => {
            try {

                const response = await getCartTotal(user.userId);
                setTotal(response.total_price);
                
            } catch (error) {
                console.error('Error:',error);
            }
        }

        fetchCart();
        fetchTotal();
        
    }, [user.userId])

    const checkoutCart = async() => {
        
        try {
            const response = await addToOrder(user.userId);
            console.log(await response);
            
            navigate('../Home');
        } catch (error) {
            console.error("Error:", error.message);
        }
    }


    return(
        <div>
            <Header />
                <div className="d-flex flex-column align-items-center">
                    <h1>Cart</h1>
                    {   
                    cart.length === 0 ? <h1>Cart is empty...</h1> :
                    <ul className="list-group list-group-flush">
                        {cart.map((donut) => 
                            {   
                                if(donut.quantity !== 0){
                                    return (<li key={donut.donut_id} className="list-group-item d-flex justify-content-between align-items-center" >{donut.name}
                                        <span className="badge bg-primary rounded-pill">{donut.quantity}</span>
                                        </li>)
                                }
                                return null;
                            }
                        )}
                    </ul>}
                    <h2>Total Amount: ${total}</h2>
                    <div>
                    <button onClick={() => checkoutCart()} className="btn btn-primary" disabled={cart.length === 0}>Checkout</button>
                    <button onClick={() => navigate('../Home')} className="btn btn-primary">Go back</button>
                    </div>
                </div>
            <Footer />
        </div>
    )
}