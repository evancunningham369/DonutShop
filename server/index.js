import express from 'express';
import cors from 'cors';

import donutRoutes from './routes/donutRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/donuts', donutRoutes);
app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});
