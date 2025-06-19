import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

console.log('DB URL:', process.env.DATABASE_URL);

app.use('/api/auth', authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port: ${port}`));

