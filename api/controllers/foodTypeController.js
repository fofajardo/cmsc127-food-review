import validator from "validator";

import {
    Actions, Subjects,
} from "../enums.js";
import {
    FoodItemService,
    FoodTypeService
} from "../services/services.js";
import { parseBool } from "../utils.js";

export async function getAllFoodTypes(aRequest, aResponse) {
    const properties = {};

    const { foodItemId } = aRequest.params;
    if (foodItemId) {
        properties["fooditemid"] = foodItemId;
    }

    const {
        name, nameIsExact, sortCol, sortOrder
    } = aRequest.query;
    if (name) {
        properties.type = {
            operator: "LIKE",
            value: `%${name}%`,
            colName: "type",
        };
        if (parseBool(nameIsExact)) {
            properties.type.operator = "=";
            properties.type.value = name;
        }
    }
    if (sortCol) {
        if (sortOrder != "ASC" && sortOrder != "DESC") {
            return aResponse.sendErrorClient("Unknown sort order");
        }
        if (sortCol != "type") {
            return aResponse.sendErrorClient("Unknown sort column");
        }
        properties.sort = [`${sortCol} ${sortOrder}`];
    }

    try {
        if (aRequest.you.cannot(Actions.READ, Subjects.FOOD_TYPE)) {
            return aResponse.sendErrorForbidden();
        }
        const result = await FoodTypeService.getAllFoodTypes(properties);
        return aResponse.sendOk(result);
    } catch (e) {
        return aResponse.sendErrorServer(e);
    }
}

export async function replaceAllFoodTypes(aRequest, aResponse) {
    const { foodItemId } = aRequest.params;
    if (!foodItemId) {
        return aResponse.sendErrorEmptyParam("foodItemId");
    }

    const { body } = aRequest;
    const requiredProps = [
        "names",
    ];
    if (aResponse.sendErrorEmptyBody(requiredProps)) {
        return;
    }

    try {
        // FIXME: add existence check of target establishment.
        // FIXME: add ownership check before adding food types to target
        //        food item.

        const foodItemExists = await FoodItemService.hasFoodItemWithId(
            foodItemId);
        if (!foodItemExists) {
            return aResponse.sendErrorClient("Food item does not exist");
        }

        const types = body.names?.split(",");

        const result = await FoodTypeService.replaceAllFoodTypesForItem(
            foodItemId, types
        );
        if (result) {
            return aResponse.sendOk(result);
        }

        return aResponse.sendErrorServer("Failed to create a new food item");
    } catch (e) {
        return aResponse.sendErrorServer(e);
    }
}

export async function deleteOneFoodType(aRequest, aResponse) {
    const { foodItemId, foodTypeName } = aRequest.params;
    if (!foodItemId) {
        return aResponse.sendErrorEmptyParam("foodItemId");
    }
    if (!validator.isNumeric(foodItemId)) {
        return aResponse.sendErrorClient(
            "Only numbers are allowed in the food item ID parameter");
    }
    if (!foodTypeName) {
        return aResponse.sendErrorEmptyParam("foodTypeName");
    }

    try {
        // FIXME: add ownership check before deleting food types.
        if (aRequest.you.cannot(Actions.MANAGE, Subjects.FOOD_TYPE)) {
            return aResponse.sendErrorForbidden();
        }

        const foodItemExists = await FoodItemService.hasFoodItemWithId(
            foodItemId);
        if (!foodItemExists) {
            return aResponse.sendErrorClient("Food item does not exist");
        }

        const foodTypeExists = await FoodTypeService.hasFoodTypeWithType(
            foodItemId, foodTypeName);
        if (!foodTypeExists) {
            return aResponse.sendErrorClient("Food type does not exist");
        }
        const result = await FoodTypeService.deleteOneFoodType(foodItemId,
            foodTypeName);
        if (!result) {
            return aResponse.sendErrorServer("Failed to delete food type");
        }
        return aResponse.sendOk(result);
    } catch (e) {
        return aResponse.sendErrorServer(e);
    }
}

export async function deleteAllFoodTypes(aRequest, aResponse) {
    const { foodItemId } = aRequest.params;
    if (!foodItemId) {
        return aResponse.sendErrorEmptyParam("foodItemId");
    }
    if (!validator.isNumeric(foodItemId)) {
        return aResponse.sendErrorClient(
            "Only numbers are allowed in the food item ID parameter");
    }

    try {
        // FIXME: add ownership check before deleting food types.
        if (aRequest.you.cannot(Actions.MANAGE, Subjects.FOOD_TYPE)) {
            return aResponse.sendErrorForbidden();
        }

        const foodItemExists = await FoodItemService.hasFoodItemWithId(
            foodItemId);
        if (!foodItemExists) {
            return aResponse.sendErrorClient("Food item does not exist");
        }

        const result = await FoodTypeService.deleteAllFoodTypes({
            fooditemid: foodItemId
        });
        if (!result) {
            return aResponse.sendErrorServer("Failed to delete food type");
        }
        return aResponse.sendOk(result);
    } catch (e) {
        return aResponse.sendErrorServer(e);
    }
}
