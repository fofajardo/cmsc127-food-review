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

export async function deleteAllFoodTypes(aProperties) {
    let append = null;
    let customFilter = aProperties.userid || aProperties.foodestid;
    if (customFilter) {
        append = " NATURAL JOIN `fooditem`";
    }
    let selectResults = await selectAll(
        kTableName,
        aProperties,
        false,
        append,
        [],
        customFilter,
        customFilter ? "fooditemid" : "*"
    );
    if (selectResults.length == 0) {
        return true;
    }
    let deleteProperties = aProperties;
    if (customFilter) {
        deleteProperties = {};
        const foodItemIds = selectResults.map(function(value) {
            return value.fooditemid;
        });
        deleteProperties.fooditemid = {
            operator: "IN",
            value: foodItemIds,
        };
        selectResults = await selectAll(kTableName, deleteProperties);
    }
    const queryResults = await deleteAll(kTableName, deleteProperties);
    return queryResults.affectedRows == selectResults.length;
}

export async function replaceAllFoodTypesForItem(aId, aTypes) {
    const isCleared = await deleteAllFoodTypes({
        fooditemid: aId
    });
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
