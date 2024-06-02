import { User } from "../models/_models.js";
import { getPool } from "../db.js";

const kTableName = "`user`";

async function _queryAllUsers(aProperties, aUseOr = false) {
    let query = `SELECT * FROM ${kTableName}`;
    let keys = Object.keys(aProperties);
    let values = Object.values(aProperties);
    if (keys.length > 0) {
        query += " WHERE";
        for (let i = 0; i < keys.length; i++) {
            if (values[i].useLike) {
                query += ` ${keys[i]} LIKE ?`
                values[i] = values[i].value;
            } else {
                query += ` ${keys[i]}=?`;
            }
            if (i < keys.length - 1) {
                query += aUseOr ? " OR" : " AND";
            }
        }
    }
    const [queryResults] = await getPool().execute(query, values);
    return queryResults;
}

export async function getAllUsers(aProperties) {
    const queryResults = await _queryAllUsers(aProperties);
    const result = User.fromRows(queryResults);
    return result;
}

export async function getOneUser(aId) {
    const [queryResults] = await getPool().execute(
        `SELECT * FROM ${kTableName} WHERE userid=?`, [aId]);
    if (queryResults.length == 0) {
        return null;
    }
    const result = new User(queryResults[0]);
    return result;
}

export async function getOneUserByUsernameOrEmail(aUsernameOrEmail) {
    const queryResults = await _queryAllUsers({
        username: aUsernameOrEmail,
        email: aUsernameOrEmail
    }, true);
    if (queryResults.length == 0) {
        return null;
    }
    const result = new User(queryResults[0]);
    return result;
}

export async function hasUserWithId(aId) {
    const queryResults = await _queryAllUsers({
        userid: aId,
    });
    return queryResults.length > 0;
}

export async function hasUserWithEmail(aEmail) {
    const queryResults = await _queryAllUsers({
        email: aEmail,
    });
    return queryResults.length > 0;
}

export async function hasUserWithUsername(aUsername) {
    const queryResults = await _queryAllUsers({
        username: aUsername,
    });
    return queryResults.length > 0;
}

export async function createNewUser(aUser) {
    const query = "INSERT INTO user" +
        " (name, password, salt, username, email, is_owner, is_end_user) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?)";
    const [queryResults] = await getPool().execute(
        query,
        Object.values(aUser)
    );
    return queryResults.affectedRows === 1;
}

export async function updateOneUser(aId, aProperties) {
    let query = `UPDATE ${kTableName}`;
    let keys = Object.keys(aProperties);
    let values = Object.values(aProperties);
    if (keys.length == 0) {
        return false;
    }
    query += " SET";
    for (let i = 0; i < keys.length; i++) {
        query += ` ${keys[i]}=?`;
        if (i < keys.length - 1) {
            query += ",";
        }
    }
    query += " WHERE userid=?";
    const [queryResults] = await getPool().execute(query, [...values, aId]);
    return queryResults.affectedRows > 0;
}

export async function deleteOneUser(aId) {
    const [queryResults] = await getPool().execute(
        `DELETE FROM ${kTableName} WHERE userid=?`, [aId]);
    return queryResults.affectedRows == 1;
}
