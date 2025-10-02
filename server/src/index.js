// server/src/index.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import usersRoutes from './routes/users.js';
import { checkDb } from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => res.send('API incuvalab viva'));

app.use('/api/users', usersRoutes);

const PORT = process.env.PORT || 4000;
const start = async () => {
  try {
    const ok = await checkDb();
    console.log(ok ? 'DB OK' : 'DB check failed');
    app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));
  } catch (e) {
    console.error('Error al iniciar:', e);
    process.exit(1);
  }
};
start();
