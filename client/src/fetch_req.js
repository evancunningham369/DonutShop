export function registerUser(userData){
    return fetchPost(userData, 'register');
}

export function loginUser(userData){
    return fetchPost(userData, 'login');
}

export async function logout(username){
    return fetchPost({username:username}, 'logout');
}

export const getAllDonuts = async(userId) => {
    const response = await fetch(`http://localhost:3001/donuts/${userId}`);
    
    return response;
}

export const getCart = async(userId) => {
    const response = await fetch(`http://localhost:3001/cart/${userId}`);

    return response;
}

export const getCartTotal = async(userId) => {
    const response = await fetch(`http://localhost:3001/cart/total/${userId}`);

    return response;
}

export function addToCart(data){
    return fetchPost(data, 'add-to-cart');
}
export const addToOrder = async(userId) =>{
    const response = await fetch(`http://localhost:3001/add-to-order/${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
}


export async function fetchPost(data, endpoint){
    const response = await fetch(`http://localhost:3001/${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    
    return response;
}