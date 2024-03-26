const { pool } = require('../database/connection.js');

const findEmail = async (email)=>{
    const query = "SELECT * FROM usuarios WHERE email = $1";
    const { rows,rowCount } = await pool.query(query, [email]);
    if (!rowCount){
        throw { code: 404, message: "User not found" }
    }
       
    return rows[0];
}

const create = async ({ email, password,rol,lenguage }) => {
    const query =
    "INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *";
    const { rows } = await pool.query(query, [email, password,rol,lenguage]);
    return rows[0];
    };

    module.exports = { findEmail,create }