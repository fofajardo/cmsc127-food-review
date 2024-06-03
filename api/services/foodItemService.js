import { FoodItem } from "../../models/_models.js";
import { selectAll, insert, updateAll, deleteAll } from "../db.js";

const kTableName = "`fooditem`";

export async function getAllFoodItems(aProperties) {
    let append = null;
    let orderKeys = aProperties.sort;
    if (aProperties.establishmentName) {
        append = " NATURAL JOIN `foodestablishment`";
    }
    if (aProperties.foodType) {
        append = " NATURAL JOIN `foodtype`";
    }
    if (orderKeys != null) {
        delete aProperties.sort;
    }
    const queryResults = await selectAll(
        kTableName, aProperties, false, append, orderKeys);
    const result = FoodItem.fromRows(queryResults);
    return result;
}

export async function getOneFoodItem(aId) {
    const queryResults = await selectAll(kTableName, {
        fooditemid: aId
    });
    if (queryResults.length === 0) {
        return null;
    }
    const result = new FoodItem(queryResults[0]);
    return result;
}

export async function hasFoodItemWithId(aId) {
    const queryResults = await selectAll(kTableName, {
        fooditemid: aId,
    });
    return queryResults.length > 0;
}

export async function createNewFoodItem(aFoodItem) {
    const queryResults = await insert(kTableName, aFoodItem);
    return queryResults.affectedRows === 1;
}

export async function updateOneFoodItem(aId, aProperties) {
    const queryResults = await updateAll(
        kTableName,
        aProperties,
        { fooditemid: aId }
    );
    return queryResults.affectedRows > 0;
}

export async function deleteAllFoodItems(aProperties) {
    const selectResults = await selectAll(kTableName, aProperties);
    if (selectResults.length == 0) {
        return true;
    }
    const queryResults = await deleteAll(kTableName, aProperties);
    return queryResults.affectedRows == selectResults.length;
}

export async function deleteOneFoodItem(aId) {
    const queryResults = await deleteAll(kTableName, {
        fooditemid: aId
    });
    return queryResults.affectedRows === 1;
}
