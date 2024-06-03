import validator from "validator";

import {
    Actions, Subjects,
} from "../enums.js";
import {
    FoodItemService,
    FoodTypeService,
    ReviewService
} from "../services/services.js";
import { hasValue, parseBool } from "../utils.js";

export async function getAllFoodItems(aRequest, aResponse) {
    const properties = {};
    const {
        id, full, priceMin, priceMax, establishmentName, establishmentId,
        name, foodType, foodTypeIsExact, sortCol, sortOrder
    } = aRequest.query;
    if (id) {
        if (!validator.isNumeric(id)) {
            return aResponse.sendErrorClient("ID must be a number");
        }
        properties.fooditemid = id;
    }
    if (full) {
        properties.full = true;
    }
    if (priceMin) {
        if (!validator.isNumeric(priceMin)) {
            return aResponse.sendErrorClient(
                "Price min range must be a number");
        }
        properties.priceMin = {
            operator: ">=",
            colName: "price",
            value: priceMin,
        };
    }
    if (priceMax) {
        if (!validator.isNumeric(priceMax)) {
            return aResponse.sendErrorClient(
                "Price max range must be a number");
        }
        properties.priceMax = {
            operator: "<=",
            colName: "price",
            value: priceMax,
        };
    }
    if (establishmentName) {
        properties.establishmentName = {
            operator: "LIKE",
            value: `%${establishmentName}%`,
            colName: "foodestname",
        };
    }
    if (foodType) {
        properties.foodType = {
            operator: "LIKE",
            value: `%${foodType}%`,
            colName: "type",
        };
        if (parseBool(foodTypeIsExact)) {
            properties.foodType.operator = "=";
            properties.foodType.value = foodType;
        }
    }
    if (name) {
        properties.fooditemname = {
            operator: "LIKE",
            value: `%${name}%`,
        };
    }
    if (establishmentId) {
        if (!validator.isNumeric(establishmentId)) {
            return aResponse.sendErrorClient(
                "Food establishment ID must be a number");
        }
        properties.establishmentId = {
            value: establishmentId,
            colName: "`fooditem`.foodestid",
        };
    }
    if (sortCol) {
        if (sortOrder != "ASC" && sortOrder != "DESC") {
            return aResponse.sendErrorClient("Unknown sort order");
        }
        if (sortCol != "fooditemname" && sortCol != "price") {
            return aResponse.sendErrorClient("Unknown sort column");
        }
        properties.sort = [`${sortCol} ${sortOrder}`];
    }

    try {
        if (aRequest.you.cannot(Actions.READ, Subjects.FOOD_ITEM)) {
            return aResponse.sendErrorForbidden();
        }
        const result = await FoodItemService.getAllFoodItems(properties);
        return aResponse.sendOk(result);
    } catch (e) {
        return aResponse.sendErrorServer(e);
    }
}

export async function getOneFoodItem(aRequest, aResponse) {
    const { foodItemId } = aRequest.params;
    if (!foodItemId) {
        return aResponse.sendErrorEmptyParam("foodItemId");
    }
    if (!validator.isNumeric(foodItemId)) {
        return aResponse.sendErrorClient(
            "Only numbers are allowed in the food item ID parameter");
    }

    try {
        const result = await FoodItemService.getOneFoodItem(foodItemId);
        if (aRequest.you.cannot(Actions.READ, result)) {
            return aResponse.sendErrorForbidden();
        }
        if (!result) {
            return aResponse.sendErrorNotFound();
        }
        return aResponse.sendOk(result);
    } catch (e) {
        return aResponse.sendErrorServer(e);
    }
}

export async function createNewFoodItem(aRequest, aResponse) {
    const { body } = aRequest;

    const requiredProps = [
        "name", "price", "foodEstablishmentId",
    ];
    if (aResponse.sendErrorEmptyBody(requiredProps)) {
        return;
    }

    try {
        // FIXME: add existence check of target establishment.
        // FIXME: add ownership check before adding food items to target
        //        establishment.

        if (!validator.isNumeric(body.price)) {
            return aResponse.sendErrorClient("Price must be a number");
        }
        if (!validator.isNumeric(body.foodEstablishmentId)) {
            return aResponse.sendErrorClient(
                "Food establishment ID must be a number");
        }

        const foodItem = {
            fooditemname: body.name,
            price: body.price,
            userid: aRequest?.user?.id,
            foodestid: body.foodEstablishmentId,
        };

        const result = await FoodItemService.createNewFoodItem(foodItem);
        if (result) {
            return aResponse.sendOk(result);
        }

        return aResponse.sendErrorServer("Failed to create a new food item");
    } catch (e) {
        return aResponse.sendErrorServer(e);
    }
}

export async function updateOneFoodItem(aRequest, aResponse) {
    const { foodItemId } = aRequest.params;
    if (!foodItemId) {
        return aResponse.sendErrorEmptyParam("foodItemId");
    }
    if (!validator.isNumeric(foodItemId)) {
        return aResponse.sendErrorClient(
            "Only numbers are allowed in the food item ID parameter");
    }

    try {
        // FIXME: add ownership check before updating food items.

        const foodItemExists = await FoodItemService.hasFoodItemWithId(
            foodItemId);
        if (!foodItemExists) {
            return aResponse.sendErrorClient("Food item does not exist");
        }

        let properties = {};
        const { body } = aRequest;
        if ("userId" in body) {
            return aResponse.sendErrorClient(
                "Changing the owner user is not allowed");
        }
        if ("foodEstablishmentId" in body) {
            return aResponse.sendErrorClient(
                "Changing the parent establishment is not allowed");
        }
        if (hasValue(body, "name")) {
            properties.fooditemname = body.name;
        }
        if (hasValue(body, "price")) {
            if (!validator.isNumeric(body.price)) {
                return aResponse.sendErrorClient("Price must be a number");
            }
            if (parseFloat(body.price) < 0) {
                return aResponse.sendErrorClient(
                    "Price must be a non-negative number");
            }
            properties.price = body.price;
        }

        const result = await FoodItemService.updateOneFoodItem(
            foodItemId, properties);
        if (result) {
            return aResponse.sendOk(result);
        }
        return aResponse.sendErrorServer("Failed to update user properties");
    } catch (e) {
        return aResponse.sendErrorServer(e);
    }
}

export async function deleteOneFoodItem(aRequest, aResponse) {
    const { foodItemId } = aRequest.params;
    if (!foodItemId) {
        return aResponse.sendErrorEmptyParam("foodItemId");
    }
    if (!validator.isNumeric(foodItemId)) {
        return aResponse.sendErrorClient(
            "Only numbers are allowed in the food item ID parameter");
    }

    try {
        // FIXME: add ownership check before deleting food items.
        if (aRequest.you.cannot(Actions.MANAGE, Subjects.FOOD_ITEM)) {
            return aResponse.sendErrorForbidden();
        }

        const foodItemExists = await FoodItemService.hasFoodItemWithId(
            foodItemId);
        if (!foodItemExists) {
            return aResponse.sendErrorClient("Food item does not exist");
        }

        const foodTypeDeleteResult = await FoodTypeService.deleteAllFoodTypes({
            fooditemid: foodItemId
        });
        if (!foodTypeDeleteResult) {
            return aResponse.sendErrorClient("Failed to delete food types");
        }
        const reviewDeleteResult = await ReviewService.deleteAllReviews({
            fooditemid: foodItemId
        });
        if (!reviewDeleteResult) {
            return aResponse.sendErrorClient("Failed to delete reviews");
        }

        const result = await FoodItemService.deleteOneFoodItem(foodItemId);
        if (!result) {
            return aResponse.sendErrorServer("Failed to delete food item");
        }
        return aResponse.sendOk(result);
    } catch (e) {
        return aResponse.sendErrorServer(e);
    }
}
