import { pool } from '../db.js'; // Asegúrate de que la conexión a la base de datos esté correctamente configurada

export const addResetToken = async (userId, token, expiration) => {
  await pool.query(
    'INSERT INTO password_reset_tokens (user_id, token, expiration) VALUES (?, ?, ?)',
    [userId, token, expiration]
  );
};

export const validateResetToken = async (token) => {
  const [result] = await pool.query(
    'SELECT * FROM password_reset_tokens WHERE token = ? AND expiration > NOW()',
    [token]
  );
  return result.length > 0 ? result[0] : null;
};
