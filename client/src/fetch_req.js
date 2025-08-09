const BASE_URL = 'http://localhost:3001';

// === AUTH ===
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (userData) => api.post('/auth/login', userData);
export const logout = () => api.post('/auth/logout');

// === Donuts & Carts ===
export const getAllDonuts = (userId) => api.get(`/donuts/${userId}`);
export const getCart = (userId) => api.get(`/cart/${userId}`);
export const getCartTotal = (userId) => api.get(`/cart/total/${userId}`);

export const addToCart = ({userId, donutId, quantity}) =>
    api.post('/cart/add-to-cart', { userId, donutId, quantity});

export const addToOrder = ({userId, total}) => 
    api.post('/order/add-to-order', {userId, total});


async function request(path, options = {}){
    const response = await fetch(`${BASE_URL}${path}`, options);
    if(!response.ok){
        const message = await response.text();
        throw new Error(`Request failed: ${response.status} ${message}`);
    }
    return response.json();
}

export const api = {
    get: (path) => request(path),
    post: (path, data = {}) =>
        request(path, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        }),
};