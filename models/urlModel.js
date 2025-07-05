const db = require('../db');

// Create student
const createURL = async (body) => {

   console.log(body);
    
  const res = await db.query(
    'INSERT INTO urls (original_url, short_code) VALUES ($1, $2)',
      [body.longUrl, body.short_code]
  );

  return res.rows;
};

const registerUser = async (body) => {

  const res = await db.query(
    'INSERT INTO users (username, password) VALUES ($1, $2) returning *',
      [body.username, body.password]
  );
 
  return res.rows[0];
};

const chekcUser = async (username) => {
  
  const res = await db.query(
    'select * from users where username = $1',
      [username]
  );
 
  return res.rows[0];
};

module.exports = {
  createURL,
  registerUser,
  chekcUser,
};