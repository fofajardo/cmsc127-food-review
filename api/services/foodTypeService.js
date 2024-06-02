import { FoodType } from "../models/_models.js";
import { selectAll, insert, deleteAll } from "../db.js";

const kTableName = "`foodtype`";

export async function getAllFoodTypes(aProperties) {
    const orderKeys = aProperties.sort;
    if (orderKeys != null) {
        delete aProperties.sort;
    }
    let isDistinct = !aProperties["fooditemid"];
    const queryResults = await selectAll(kTableName, aProperties, false,
        null, orderKeys, isDistinct, isDistinct ? "type" : "*");
    const result = FoodType.fromRows(queryResults);
    return result;
}

export async function hasFoodTypeWithType(aId, aType) {
    const queryResults = await selectAll(kTableName, {
        fooditemid: aId,
        type: aType,
    });
    return queryResults.length > 0;
}

export async function createNewFoodType(aFoodType) {
    const queryResults = await insert(kTableName, aFoodType);
    return queryResults.affectedRows === 1;
}

export async function deleteOneFoodType(aId, aType) {
    const queryResults = await deleteAll(kTableName, {
        fooditemid: aId,
        type: aType
    });
    return queryResults.affectedRows === 1;
}

export async function deleteAllFoodTypes(aId) {
    const properties = {
        fooditemid: aId
    };
    const selectResults = await selectAll(kTableName, properties);
    if (selectResults.length == 0) {
        return true;
    }
    const queryResults = await deleteAll(kTableName, properties);
    return queryResults.affectedRows == selectResults.length;
}

export async function replaceAllFoodTypesForItem(aId, aTypes) {
    const isCleared = await deleteAllFoodTypes(aId);
    if (isCleared) {
        const queryResults = await insert(kTableName,
            ["fooditemid", "type"],
            aTypes.map(function(aValue) {
                return [aId, aValue.trim()];
            })
        );
        return queryResults.affectedRows == aTypes.length;
    }
    return false;
}
