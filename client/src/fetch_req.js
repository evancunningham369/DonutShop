const BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:3001';
console.log(import.meta.env.VITE_API_BASE);
// === AUTH ===
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (userData) => api.post('/auth/login', userData);
export const logout = () => api.post('/auth/logout');
export const me = () => api.get('/auth/me');

// === Donuts & Carts ===
export const getAllDonuts = (userId) => api.get(`/donuts/${userId}`);
export const getCart = () => api.get(`/cart`);
export const getCartTotal = () => api.get(`/cart/total`);

export const addToCart = ({donutId, quantity}) =>
    api.post('/cart/add', { donutId, quantity });

export const addToOrder = ({userId, total}) => 
    api.post('/order/add-to-order', {userId, total});

// eslint-disable-next-line
async function legacy_request(path, options = {}){
    const response = await fetch(`${BASE_URL}${path}`, options);
    if(!response.ok){
        const message = await response.text();
        throw new Error(`Request failed: ${response.status} ${message}`);
    }
    return response.json();
}

async function request(path, options = {}){
    const res = await fetch(`${BASE_URL}${path}`, {
        credentials: 'include',
        ...options,
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    });
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
    const ct = res.headers.get('content-type') || '';
    return ct.includes('application/json') ? res.json() : null;
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