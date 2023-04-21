export function registerUser(userData){
    return fetchPost(userData, 'register');
}

export function loginUser(userData){
    return fetchPost(userData, 'login');
}

export function addToUserCart(username, donut){
    const data = {
        username: username,
        donut: donut
    }
    return fetchPost(data, 'add-to-cart');
}

export function addToOrders(finalCart){
    return fetchPost(finalCart, 'add-order');
}

export async function logOut(username){

    const response = await fetch('http://localhost:3001/empty-cart', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username: username})
    });

    if(response.ok){
        return response;
    }
    else{
        console.log(response.status);
    }
}

export async function fetchPost(data, endpoint){
    const response = await fetch(`http://localhost:3001/${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const serverResponse = await response.json();
    return serverResponse;
}