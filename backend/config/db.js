import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",      // Change this if using a cloud DB
  user: "root",           // Your MySQL username
  password: "password",   // Your MySQL password
  database: "guest_house_db",
  connectionLimit: 10,
});

export default pool.promise();
