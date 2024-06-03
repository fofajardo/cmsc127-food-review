import { FoodItem } from "../../models/_models.js";
import { selectAll, insert, updateAll, deleteAll } from "../db.js";

const kTableName = "`fooditem`";

export async function getAllFoodItems(aProperties) {
    let append = "";
    let orderKeys = aProperties.sort;
    if (aProperties.establishmentName || aProperties.full) {
        append += " INNER JOIN `foodestablishment` ON `fooditem`.foodestid=`foodestablishment`.foodestid";
    }
    if (aProperties.foodType || aProperties.full) {
        append += " NATURAL JOIN `foodtype`";
    }
    if (orderKeys != null) {
        delete aProperties.sort;
    }
    let filter = "*";
    let groupBy = [];
    if (aProperties.full) {
        filter += ", GROUP_CONCAT(type) as types";
        groupBy.push("fooditemid");
        delete aProperties.full;
    }
    const queryResults = await selectAll(
        kTableName, aProperties, false, append, orderKeys, false, filter, groupBy);
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
    const success = queryResults.affectedRows === 1;
    return success ? queryResults.insertId : false;
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
