
import express from 'express';

// DotEnv module
import dotenv from 'dotenv';

import cors from 'cors';

import db from './db/db.js';

import userRoutes from './routes/userRoutes.js';


dotenv.config()

const app = express();

// mongo connect

db();

app.use([cors(), express.json(), express.urlencoded({ extended: true })]);


app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `server is running on port: ${PORT}`);


