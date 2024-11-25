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
        <div className="col">
            <div className="card">
                <h5 className="card-title">{props.name + " Donut"}</h5>
                <h5>Price: ${props.price}</h5>
                {/* <p className="card-text">description</p> */}
                <div className="card-body d-flex align-items-center">
                    <img className="card-img-top card-image" src={`/images/${props.name}.jpg`} alt={props.name + " Donut image"} />
                </div>
                    <div className="quantity-buttons">
                        <button onClick={() => updateQuantity(quantity - 1)} className="btn btn-primary btn-circle col-md-4" disabled={quantity === 0}>-</button>
                        <h2>Qty: {quantity}</h2>
                        <button onClick={() => updateQuantity(quantity + 1)} className="btn btn-primary btn-circle col-md-4">+</button>
                    </div>
            </div>
        </div>
    )
}