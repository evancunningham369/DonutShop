import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToOrders, fetchPost } from '../fetch_req';

export default function Checkout(){
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [orderSubmit, setOrder] = useState(false);
    const [cart, setCart] = useState([]);
    const [response, setResponse] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        let total = 0;
        async function getUserCart(username){
            const response = fetchPost({ username: username }, 'cart');
            const cart = await response;
            setCart([...cart]);
            cart.map((donut) => total += donut.price);
            setTotalPrice(total);
        }
        
        getUserCart(user.username);
    }, [])

    async function addOrder(){
        const date = new Date().toLocaleString();

        const finalOrder = {
            user: user.username,
            cart: [...cart],
            total: totalPrice,
            orderDate: date
        };

        const serverResponse = await addToOrders(finalOrder);
        setOrder(true);
        setResponse(serverResponse.message);
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate('../Home');
    }

    return(
        <div>
            {orderSubmit ? (<h1>{response}</h1>) : (
            <div>
                <h1>Cart</h1>
                <ul>
                    {cart.map((donut, index) => (
                        <li key={index}>{donut.name}</li>
                    ))}
                </ul>
                <h2>Total Amount: ${totalPrice}.00</h2>
                <button onClick={addOrder} className="btn btn-primary">Checkout</button>
            </div>)}
        </div>
    )
}