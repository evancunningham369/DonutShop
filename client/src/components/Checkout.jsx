import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToOrders, fetchPost } from '../fetch_req';
import Header from "./Header";
import Footer from "./Footer";

export default function Checkout(){
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [orderSubmit, setOrder] = useState(false);
    const [cart, setCart] = useState([]);
    const [emptyCart, setEmptyCart] = useState(false);
    const [response, setResponse] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        let total = 0;
        async function getUserCart(username){
            const response = fetchPost({ username: username }, 'cart');
            const userCart = await response;
            setEmptyCart(userCart.length === 0);
            userCart.map((donut) => total += donut.total);
            setTotalPrice(total.toFixed(2));
            setCart(userCart);
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
        cart.map((donut) => sessionStorage.removeItem(donut.name));
        await new Promise(resolve => setTimeout(resolve, 500));
        navigate('../Home');
    }

    function goBack(){
        navigate('../Home');
    }

    return(
        <div>
            <Header />
            {orderSubmit ? (<h1>{response}</h1>) : (
            <div className="d-flex flex-column align-items-center">
                <h1>Cart</h1>
                <ul className="list-group list-group-flush">
                    {cart.map((donut, index) => 
                    (<li className="list-group-item d-flex justify-content-between align-items-center" key={index}>{donut.name}
                    <span className="badge bg-primary rounded-pill">{donut.quantity}</span>
                    </li>)
                    )}
                </ul>
                <h2>Total Amount: ${totalPrice}</h2>
                {emptyCart ? (
                <div>
                    <h2>Cart is empty. Go back to add donuts to your cart</h2>
                    <button className="btn btn-primary" disabled>Checkout</button>
                    <button onClick={goBack}className="btn btn-primary">Go back</button>
                </div>):
                 (<div>
                    <button onClick={addOrder} className="btn btn-primary">Checkout</button>
                    <button onClick={goBack}className="btn btn-primary">Go back</button>
                 </div>)}
            </div>)}
            <Footer />
        </div>
    )
}