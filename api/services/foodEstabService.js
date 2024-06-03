import { FoodEstablishment } from "../models/_models.js";
import { selectAll, insert, updateAll, deleteAll } from "../db.js";

const kTableName = "`foodestablishment`";

export async function getAllEstablishments(aProperties) {
    const queryResults = await selectAll(kTableName, aProperties);
    return FoodEstablishment.fromRows(queryResults);
}

export async function getOneEstablishment(aId) {
    const queryResults = await selectAll(kTableName, { establishmentid: aId });
    if (queryResults.length === 0) {
        return null;
    }
    return new FoodEstablishment(queryResults[0]);
}

export async function hasEstablishmentWithId(aId) {
    const queryResults = await selectAll(kTableName, { establishmentid: aId });
    return queryResults.length > 0;
}

export async function hasEstablishmentWithName(aName) {
    const queryResults = await selectAll(kTableName, { name: aName });
    return queryResults.length > 0;
}

export async function createNewEstablishment(aEstablishment) {
    const queryResults = await insert(kTableName, aEstablishment);
    return queryResults.affectedRows === 1;
}

export async function updateOneEstablishment(aId, aProperties) {
    const queryResults = await updateAll(kTableName, aProperties, { establishmentid: aId });
    return queryResults.affectedRows > 0;
}

export async function deleteAllFoodEstablishments(aProperties) {
    const selectResults = await selectAll(kTableName, aProperties);
    if (selectResults.length == 0) {
        return true;
    }
    const queryResults = await deleteAll(kTableName, aProperties);
    return queryResults.affectedRows == selectResults.length;
}

export async function deleteOneEstablishment(aId) {
    const queryResults = await deleteAll(kTableName, { establishmentid: aId });
    return queryResults.affectedRows === 1;
}