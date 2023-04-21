import Header from "./Header";
import Footer from './Footer';
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToUserCart, logOut } from "../fetch_req";

function Home(){
    const user = JSON.parse(sessionStorage.getItem('user'));
    const navigate = useNavigate();
    const [price, updatePrice] = useState(0);
    const [selection, updateSelection] = useState({});
    const [response, setResponse] = useState("");
    const [cart, setCart] = useState([]);

    async function addToCart(e){
        e.preventDefault();
        if(selection.name !== undefined){
            setCart(
                [
                    ...cart,
                    selection
                ]
            );
        }
        else{
            console.log("no selection made");
        }
        const serverResponse = await addToUserCart(user.username, selection);
        setResponse(serverResponse.message);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setResponse(null);
    }

    function onSelection(e){
        const donutSelected = e.target.value;

        const price = donutSelected === 'glazed' ? 1 : 2;

        updatePrice(price);

        updateSelection({
            name: donutSelected,
            price: price
        });
    }

    function checkOut(){
        navigate('../Checkout');
    }

    async function handleLogOut(){
        const response = await logOut(user.username);
        if(response.ok){
            setCart([{}]);
            navigate('../');
        }
    }

    return(
        <div>
            <Header />
            <h2>Logged in as {user.username}</h2>
            <form className="form-control" id="form" onSubmit={addToCart}>
                <div>
                    <label htmlFor="donuts">Choose donuts</label>
                </div>
                <select onChange={onSelection} form="form" name="donuts" id="donuts">
                    <option value="" disabled selected>Please choose an option</option>
                    <option name="glazed" value="glazed">Glazed</option>
                    <option name="cake" value="cake">Cake</option>
                </select>
                <button className="btn btn-primary" type="submit">Add</button>
                <h2>Price: {price}</h2>
                <h2>{response}</h2>
                
            </form>
            <div>
                <button onClick={checkOut} className="btn btn-primary">Go To Cart</button>
                <button onClick={handleLogOut} className="btn btn-primary">Log-Out</button>
            </div>
            <Footer />
        </div>
    );
}

export default Home;