import Header from "./Header";
import Footer from './Footer';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToUserCart, logOut } from "../fetch_req";
import { Card } from "./Card";

function Home(){
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [checkedOut, setCheckout] = useState(false);
    const navigate = useNavigate();

    const donuts = [
        {
            name: "Glazed",
            image: 'https://images.unsplash.com/photo-1564545508148-9f5ce263df8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Z2xhemVkJTIwZG9udXR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60',
            desc: 'A donut covered in sweet glaze',
            price:1,
        },
        {
            name: "Cake",
            image: 'https://cdn.pixabay.com/photo/2017/04/04/16/35/cake-2201820_1280.jpg',
            desc: 'A whole cake you can fit in the palm of your hand!',
            price:2,
        },
        {
            name: "Plain",
            image: 'https://static4.depositphotos.com/1006913/269/i/600/depositphotos_2696137-stock-photo-donut.jpg',
            desc: 'Simply a traditional plain donut. I won\'t judge....much',
            price:.50,
        },
        {
            name: "Chocolate Sprinkle",
            image: 'https://images.unsplash.com/photo-1562945431-ce2b63d5a7fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
            desc: 'What\'s better than a chocolate donut? A chocolate donut...with sprinkles',
            price:1.50,
        },];

    async function checkOut(){
        setCheckout(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        navigate('../Checkout');
    }

    async function handleLogOut(){
        const response = await logOut(user.username);
        sessionStorage.clear();
        if(response.ok){
            navigate('../');
        }
    }

    async function addDonutToCart(donut){
        sessionStorage.setItem(donut.name, JSON.stringify(donut.quantity));
        await addToUserCart(user.username, donut);
    }

    return(
        <div>
            <Header />
            {checkedOut ? (<h1>Checking out...</h1>): 
            (<div>
                    <h2>Logged in as {user.username}</h2>
                <div className="card-group mt-2">
                    {donuts.map((donut, index) => {
                        const quantity = sessionStorage.getItem(donut.name);
                        return (
                            <Card addToCart={(donut) => addDonutToCart(donut)} key={index} name={donut.name} quantity={quantity} price={donut.price} desc={donut.desc} image={donut.image}/>
                        )
                    })}
                </div>
                <div>
                    <button onClick={checkOut} className="btn btn-primary">Add To Cart</button>
                    <button onClick={handleLogOut} className="btn btn-primary">Log-Out</button>
                </div>
            </div>)}
            <Footer />
        </div>
    );
}

export default Home;