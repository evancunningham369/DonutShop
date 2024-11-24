import { useState } from "react";
import { addToCart } from "../fetch_req";

export function Card(props){
    const [quantity, setQuantity] = useState(props.quantity);
    
    const updateQuantity = async(amount) => {
        try {
            setQuantity(amount);
            await addToCart({userId: props.userId, donutId: props.donutId, quantity: amount});
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div className="col-lg-2 d-flex align-items-stretch">
            <div className="card">
                <img className="card-img-top" src={props.image} alt={props.name + " Donut image"} />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{props.name + " Donut"}</h5>
                    <p className="card-text">description</p>
                    <div className="row mt-auto">
                        <button onClick={() => updateQuantity(quantity - 1)} className="btn btn-primary btn-circle col-md-4" disabled={quantity === 0}>-</button>
                        <button onClick={() => updateQuantity(quantity + 1)} className="btn btn-primary btn-circle col-md-4">+</button>
                    </div>
                        <h3>Price: ${props.price}</h3>
                    <h2>Qty: {quantity}</h2>
                </div>
            </div>
        </div>
    )
}