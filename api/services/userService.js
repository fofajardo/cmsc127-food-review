import { User } from "../../models/_models.js";
import { selectAll, updateAll, insert, deleteAll } from "../db.js";

const kTableName = "`user`";

export async function getAllUsers(aProperties) {
    const queryResults = await selectAll(kTableName, aProperties);
    const result = User.fromRows(queryResults);
    return result;
}

export async function getOneUser(aId) {
    const queryResults = await selectAll(kTableName, {
        userid: aId
    });
    if (queryResults.length === 0) {
        return null;
    }
    const result = new User(queryResults[0]);
    return result;
}

export async function getOneUserByUsernameOrEmail(aUsernameOrEmail) {
    const queryResults = await selectAll(kTableName, {
        username: aUsernameOrEmail,
        email: aUsernameOrEmail
    }, true);
    if (queryResults.length === 0) {
        return null;
    }
    const result = new User(queryResults[0]);
    return result;
}

export async function hasUserWithId(aId) {
    const queryResults = await selectAll(kTableName, {
        userid: aId,
    });
    return queryResults.length > 0;
}

export async function hasUserWithEmail(aEmail) {
    const queryResults = await selectAll(kTableName, {
        email: aEmail,
    });
    return queryResults.length > 0;
}

export async function hasUserWithUsername(aUsername) {
    const queryResults = await selectAll(kTableName, {
        username: aUsername,
    });
    return queryResults.length > 0;
}

export async function createNewUser(aUser) {
    const queryResults = await insert(kTableName, aUser);
    return queryResults.affectedRows === 1;
}

export async function updateOneUser(aId, aProperties) {
    const queryResults = await updateAll(
        kTableName,
        aProperties,
        { userid: aId }
    );
    return queryResults.affectedRows > 0;
}

export async function deleteOneUser(aId) {
    const queryResults = await deleteAll(kTableName, {
        userid: aId
    });
    return queryResults.affectedRows === 1;
}
