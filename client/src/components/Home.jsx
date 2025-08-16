import Header from "./Header";
import Footer from './Footer';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, getAllDonuts } from "../fetch_req";
import { Card } from "./Card";
import { useUser } from "../context/UserContext";

function Home(){
    const [donuts, setDonuts] = useState([]);
    const navigate = useNavigate();
    const { user, setUser } = useUser();

    useEffect(() => {
        const fetchDonuts = async() => {
            try {
                const data = await getAllDonuts(user.userId);
                setDonuts(data);
            } catch (error) {
                console.error("Error:", error);
            }
        }

        fetchDonuts();
    }, [user.userId])

    async function checkOut(){
        navigate('../Checkout');
    }

    async function handleLogout(){
        await logout();
        setUser(null);
    }
    
    return(
        <div>
            <Header />
            <div className="container">
                <h2>Logged in as {user.username}</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
                    {
                            donuts.map(donut =>
                                <Card key={donut.donut_id} userId={user.userId} donutId={donut.donut_id} name={donut.name} price={donut.price} quantity={donut.quantity}/>
                            )
                    }
                </div>
                <div>
                    <button onClick={checkOut} className="btn btn-primary">Go To Cart</button>
                    <button onClick={handleLogout} className="btn btn-primary">Log-Out</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;