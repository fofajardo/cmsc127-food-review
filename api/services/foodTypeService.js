import { FoodItem } from "../models/_models.js";
import { selectAll, insert, updateAll, deleteAll } from "../db.js";

const kTableName = "`fooditem`";

export async function getAllFoodItems(aProperties) {
    let append = null;
    if (aProperties.establishmentName) {
        append = "NATURAL JOIN `foodestablishment`";
        aProperties["foodestname"] = aProperties.establishmentName;
        delete aProperties.establishmentName;
    }
    const queryResults = await selectAll(
        kTableName, aProperties, false, append);
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

export async function deleteOneFoodItem(aId) {
    const queryResults = await deleteAll(kTableName, {
        fooditemid: aId
    });
    return queryResults.affectedRows === 1;
}
