import express from 'express';
import cors from 'cors';
import pool from './config/database.js';

import session from 'express-session';
import pgSimple from 'connect-pg-simple';

import donutRoutes from './routes/donutRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3001;
// Support multiple allowed origins via env (comma-separated)
const ORIGINS = (process.env.ORIGINS || 'http://localhost:3000')
    .split(',')
    .map(o => o.trim());

app.use(cookieParser());
app.use(express.json());

app.use(cors({
        origin: ORIGINS,
        credentials: true,
}));

// Trust proxy when running behind Netlify/hosted proxies for correct secure cookies
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

// Postgres store ----
const PgSession = pgSimple(session);

app.use(
    session({
        store: new PgSession({
            pool,
            tableName: 'session',
            createTableIfMissing: true,
        }),
        name: process.env.COOKIE_NAME || 'sid',
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        },
    })
);

app.use('/donuts', donutRoutes);
app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});
