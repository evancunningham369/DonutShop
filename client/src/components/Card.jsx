import { useEffect, useState } from "react";
import { addToUserCart } from "../fetch_req";

export function Card(props){
    const username = JSON.parse(sessionStorage.getItem('user')).username;
    const [response, setResponse] = useState("");
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        props.addToCart({
            name: props.name,
            price: props.price,
            quantity: quantity,
            total: props.price * quantity,
        });
    }, [quantity])

    function increaseQuantity(){
        setQuantity(quantity + 1);
    }

    function decreaseQuantity(){
        if(quantity < 1){
            setQuantity(0);
        }
        else{
            setQuantity(quantity - 1);
        }
    }

    return (
        <div className="col-lg-2 d-flex align-items-stretch">
            <div className="card">
                <img className="card-img-top" src={props.image} alt={props.name + " Donut image"} />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{props.name + " Donut"}</h5>
                    <p className="card-text">{props.desc}</p>
                    <div className="row mt-auto">
                        <button onClick={decreaseQuantity} className="btn btn-primary btn-circle col-md-4">-</button>
                        <h3 style={{display: "inline-block"}} className="col-md-4">Price: ${props.price}</h3>
                        <button onClick={increaseQuantity} className="btn btn-primary btn-circle col-md-4">+</button>
                    </div>
                    <h2>Qty: {quantity}</h2>
                </div>
            </div>
        </div>
    )
}