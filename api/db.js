import mysql2 from "mysql2/promise";

/** @type {mysql2.Pool} */
var _pool = null;

/** @returns {mysql2.Pool} */
export function getPool() {
    if (_pool == null) {
        _pool = mysql2.createPool({
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            database: process.env.MYSQL_DBNAME,
            connectionLimit: process.env.MYSQL_CONN_LIMIT,
        });
    }
    return _pool;
}
