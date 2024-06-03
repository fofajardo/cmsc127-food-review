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

function _buildFilter(aKeys, aValues, aUseOr) {
    let query = "";
    for (let i = 0; i < aKeys.length; i++) {
        const realValue = aValues[i].value;

        const colName = aValues[i]?.colName;
        if (colName != null) {
            aKeys[i] = colName;
        }

        const operator = aValues[i]?.operator;
        if (operator != null) {
            const isMultiple = operator == "IN";
            let parameter = "";
            if (isMultiple && Array.isArray(realValue)) {
                parameter += "(";
                const parameterList = Array(realValue.length).fill("?", 0);
                parameter += parameterList.join(", ");
                parameter += ")";
            } else {
                parameter = "?";
            }
            query += ` ${aKeys[i]} ${operator} ${parameter}`;
        } else {
            query += ` ${aKeys[i]}=?`;
        }

        if (realValue != null) {
            aValues[i] = realValue;
        }

        if (i < aKeys.length - 1) {
            query += aUseOr ? " OR" : " AND";
        }
    }
    return query;
}

export async function selectAll(
    aTableName,
    aProperties,
    aUseOr = false,
    aAppend = null,
    aOrderKeys = [],
    aDistinct = false,
    aFilter = "*"
) {
    let distinct = aDistinct ? " DISTINCT" : "";
    let query = `SELECT${distinct} ${aFilter} FROM ${aTableName}`;
    if (aAppend) {
        query += aAppend;
    }
    let keys = Object.keys(aProperties);
    let values = Object.values(aProperties);
    if (keys.length > 0) {
        query += " WHERE";
        query += _buildFilter(keys, values, aUseOr);
    }
    if (aOrderKeys.length > 0) {
        query += " ORDER BY ";
        query += aOrderKeys.join(", ");
    }
    const [queryResults] = await getPool().execute(
        query,
        values.flat()
    );
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
        query += _buildFilter(filterKeys, filterValues, aUseOr);
    }

    const [queryResults] = await getPool().execute(
        query,
        [...updateValues, ...filterValues.flat()]
    );
    return queryResults;
}

export async function insert(aTableName, aTupleOrKeys, aValues = null) {
    let query = `INSERT INTO ${aTableName}`;

    let keys = null;
    let allValues = null;

    if (Array.isArray(aTupleOrKeys) && Array.isArray(aValues)) {
        keys = aTupleOrKeys;
        allValues = aValues;
    } else {
        keys = Object.keys(aTupleOrKeys);
        allValues = [Object.values(aTupleOrKeys)];
    }

    if (keys.length == 0) {
        throw Error("Object is empty");
    }
    query += " (";
    query += keys.join(", ");
    query += ") VALUES ";

    for (let i = 0; i < allValues.length; i++) {
        const values = allValues[i];
        query += "(";
        for (let j = 0; j < values.length; j++) {
            query += "?";
            if (j < values.length - 1) {
                query += ", ";
            }
        }
        query += ")";
        if (i < allValues.length - 1) {
            query += ", ";
        }
    }

    const [queryResults] = await getPool().execute(
        query,
        allValues.flat()
    );
    return queryResults;
}

export async function deleteAll(aTableName, aProperties, aUseOr = false) {
    let query = `DELETE FROM ${aTableName}`;
    let keys = Object.keys(aProperties);
    let values = Object.values(aProperties);
    if (keys.length > 0) {
        query += " WHERE";
        query += _buildFilter(keys, values, aUseOr);
    }
    const [queryResults] = await getPool().execute(
        query,
        values.flat()
    );
    return queryResults;
}