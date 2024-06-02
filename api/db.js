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

export async function selectAll(aTableName, aProperties, aUseOr = false) {
    let query = `SELECT * FROM ${aTableName}`;
    let keys = Object.keys(aProperties);
    let values = Object.values(aProperties);
    if (keys.length > 0) {
        query += " WHERE";
        for (let i = 0; i < keys.length; i++) {
            const operator = values[i]?.operator;
            if (operator != null) {
                query += ` ${keys[i]} ${operator} ?`
            } else {
                query += ` ${keys[i]}=?`;
            }
            const realValue = values[i].value;
            if (realValue != null) {
                values[i] = values[i].value;
            }
            if (i < keys.length - 1) {
                query += aUseOr ? " OR" : " AND";
            }
        }
    }
    const [queryResults] = await getPool().execute(query, values);
    return queryResults;
}

export async function updateAll(aTableName, aUpdate, aFilter, aUseOr = false) {
    let query = `UPDATE ${aTableName}`;
    // Prepare the update part of the query.
    let updateKeys = Object.keys(aUpdate);
    let updateValues = Object.values(aUpdate);
    if (updateKeys.length == 0) {
        return false;
    }
    query += " SET";
    for (let i = 0; i < updateKeys.length; i++) {
        query += ` ${updateKeys[i]}=?`;
        if (i < updateKeys.length - 1) {
            query += ",";
        }
    }
    // Prepare the filter part of the query.
    let filterKeys = Object.keys(aFilter);
    let filterValues = Object.values(aFilter);
    if (filterKeys.length > 0) {
        query += " WHERE";
        for (let i = 0; i < filterKeys.length; i++) {
            const operator = filterValues[i]?.operator;
            if (operator != null) {
                query += ` ${filterKeys[i]} ${operator} ?`
            } else {
                query += ` ${filterKeys[i]}=?`;
            }
            const realValue = filterValues[i].value;
            if (realValue != null) {
                filterValues[i] = filterValues[i].value;
            }
            if (i < filterKeys.length - 1) {
                query += aUseOr ? " OR" : " AND";
            }
        }
    }

    const [queryResults] = await getPool().execute(
        query,
        [...updateValues, ...filterValues]
    );
    return queryResults;
}

export async function insert(aTableName, aTuple) {
    let query = `INSERT INTO ${aTableName}`;
    let keys = Object.keys(aTuple);
    let values = Object.values(aTuple);
    if (keys.length == 0) {
        throw Error("Object is empty");
    }
    query += " (";
    for (let i = 0; i < keys.length; i++) {
        query += keys[i];
        if (i < keys.length - 1) {
            query += ", ";
        }
    }
    query += ") VALUES (";
    for (let i = 0; i < values.length; i++) {
        query += "?";
        if (i < values.length - 1) {
            query += ", ";
        }
    }
    query += ")";
    const [queryResults] = await getPool().execute(
        query,
        values
    );
    return queryResults;
}

export async function deleteAll(aTableName, aProperties, aUseOr = false) {
    let query = `DELETE FROM ${aTableName}`;
    let keys = Object.keys(aProperties);
    let values = Object.values(aProperties);
    if (keys.length > 0) {
        query += " WHERE";
        for (let i = 0; i < keys.length; i++) {
            const operator = values[i]?.operator;
            if (operator != null) {
                query += ` ${keys[i]} ${operator} ?`
            } else {
                query += ` ${keys[i]}=?`;
            }
            const realValue = values[i].value;
            if (realValue != null) {
                values[i] = values[i].value;
            }
            if (i < keys.length - 1) {
                query += aUseOr ? " OR" : " AND";
            }
        }
    }
    const [queryResults] = await getPool().execute(query, values);
    return queryResults;
}