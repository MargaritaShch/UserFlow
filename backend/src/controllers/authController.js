import  pool  from '../db/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

console.log('Using DB pool:', pool);
// ---------- REGISTRATION ---------- //
export const register = async (req, res) => {
  const { firstName, secondName, lastName, email, phone, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
  //create profile
    const userProfile = await pool.query(
      `INSERT INTO user_profiles (first_name, second_name, last_name, email, phone)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [firstName, secondName,lastName, email, phone]
    );

    const login = email || phone;

    //create reg
    await pool.query(
      `INSERT INTO user_credentials (user_id, login, password)
       VALUES ($1, $2, $3)`,
      [userProfile.rows[0].id, login, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------- LOGIN ---------- //
export const login = async (req, res) => {
  const { login, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT * FROM user_credentials WHERE login = $1`,
      [login]
    );

    if (result.rows.length === 0) return res.status(401).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, result.rows[0].password);
    if (!isMatch) return res.status(401).json({ message: 'Wrong password' });

    const token = jwt.sign({ userId: result.rows[0].user_id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------- GET PROFILE ---------- //
export const getProfile = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const result = await pool.query(
      `SELECT * FROM user_profiles WHERE id = $1`,
      [decoded.userId]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// ---------- DELETE PROFILE ----------//
export const deleteProfile = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 1. копируем в архивawait pool.query(`
    await pool.query(`
    INSERT INTO deleted_user_profiles (original_user_id, first_name, second_name, last_name, email, phone)
    SELECT id, first_name, second_name, last_name, email, phone
    FROM user_profiles
    WHERE id = $1
    `,
        [decoded.userId]);

    // 2. удаляем
    await pool.query(`DELETE FROM user_profiles WHERE id = $1`, [decoded.userId]);

    res.json({ message: 'Profile deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
