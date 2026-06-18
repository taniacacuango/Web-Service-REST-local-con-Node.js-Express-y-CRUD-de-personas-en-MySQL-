import dotenv from 'dotenv';

const result = dotenv.config();

console.log('DOTENV:', result);
console.log('DB_USER:', process.env.DB_USER);

import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});