import validator from "validator";

import {
    Actions, Subjects,
} from "../enums.js";
import {
    ReviewService
} from "../services/services.js";
import { hasValue } from "../utils.js";

export async function getAllReviews(aRequest, aResponse) {
    const properties = {};
    const { userId, establishmentId, foodItemId, establishmentName, foodItemName, sortCol, sortOrder } = aRequest.query;

    if (userId && !validator.isNumeric(userId)) {
        return aResponse.sendErrorClient("User ID must be a number");
    }
    if (establishmentId && !validator.isNumeric(establishmentId)) {
        return aResponse.sendErrorClient("Food Destination ID must be a number");
    }
    if (foodItemId && !validator.isNumeric(foodItemId)) {
        return aResponse.sendErrorClient("Food Item ID must be a number");
    }

    if (sortCol) {
        if (sortOrder !== "ASC" && sortOrder !== "DESC") {
            return aResponse.sendErrorClient("Unknown sort order");
        }
        if (sortOrder !== "rating" && sortOrder !== "date") {
            return aResponse.sendErrorClient("Unknown sort order");
        }
        properties.sort = [`${sortCol} ${sortOrder}`];
    }
    if (establishmentName) {
        properties.establishmentName = {
            operator: "LIKE",
            value: `%${establishmentName}%`,
            colName: "foodestname",
        };
    }
    if (foodItemName) {
        properties.fooditemname = {
            operator: "LIKE",
            value: `%${foodItemName}%`,
        };
    }

    try {
        if (aRequest.you.cannot(Actions.READ, Subjects.REVIEW)) {
            return aResponse.sendErrorForbidden();
        }
        const result = await ReviewService.getAllReviews(properties);
        return aResponse.sendOk(result);
    } catch (e) {
        return aResponse.sendErrorServer(e);
    }
}

export async function getOneReview(aRequest, aResponse) {
    const { reviewId } = aRequest.params;
    if (!reviewId) {
        return aResponse.sendErrorEmptyParam("reviewId");
    }
    if (!validator.isNumeric(reviewId)) {
        return aResponse.sendErrorClient(
            "Only numbers are allowed in the review ID parameter");
    }

    try {
        const result = await ReviewService.getOneReview(reviewId);
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

export async function createNewReview(aRequest, aResponse) {
    const { body } = aRequest;
    const requiredProps = [
        "type", "note", "date", "rating", "userId", "foodEstablishmentId", "foodItemId"
    ];
    if (aResponse.sendErrorEmptyBody(requiredProps)) {
        return;
    }

    try {
        if (aRequest.you.cannot(Actions.CREATE, Subjects.REVIEW)) {
            return aResponse.sendErrorForbidden();
        }
        if (!validator.isNumeric(body.rating)) {
            return aResponse.sendErrorClient("Rating must be a number");
        }

        const review = {
            type: body.type,
            note: body.note,
            date: body.date,
            rating: body.rating,
            userid: aRequest?.user?.id,
            foodestid: body.foodEstablishmentId,
            fooditemid: body.foodItemId,
        }; 
        
        const result = await ReviewService.createNewReview(review);
        if (result) {
            return aResponse.sendOk(result);
        }

        return aResponse.sendErrorServer("Failed to create a new review");
    } catch (e) {
        return aResponse.sendErrorServer(e);
    }
}

export async function updateOneReview(aRequest, aResponse) {
    const { reviewId } = aRequest.params;
    if (!reviewId) {
        return aResponse.sendErrorEmptyParam("reviewId");
    }
    if (!validator.isNumeric(reviewId)) {
        return aResponse.sendErrorClient(
            "Only numbers are allowed in the review ID parameter");
    }

    try {
        const reviewExists = await ReviewService.hasReviewWithId(reviewId);
        if (!reviewExists) {
            return aResponse.sendErrorClient("Review does not exist");
        }

        const properties = {};
        const { body } = aRequest;
        if ("userId" in body) {
            return aResponse.sendErrorClient(
                "Changing the owner user is not allowed");
        }
        if ("foodEstablishmentId" in body) {
            return aResponse.sendErrorClient(
                "Changing the parent establishment is not allowed");
        }
        if ("foodItemId" in body) {
            return aResponse.sendErrorClient(
                "Changing the parent food item is not allowed");
        }
        if (aRequest.you.cannot(Actions.UPDATE, Subjects.REVIEW)) {
            return aResponse.sendErrorForbidden();
        }
        if (hasValue(body, "type")) properties.type = body.type;
        if (hasValue(body, "note")) properties.note = body.note;
        if (hasValue(body, "date")) properties.date = body.date;
        if (hasValue(body, "rating")) {
            if (!validator.isNumeric(body.rating)) {
                return aResponse.sendErrorClient("Rating must be a number");
            }
            properties.rating = body.rating;
        }

        const result = await ReviewService.updateOneReview(reviewId, properties);
        if (result) {
            return aResponse.sendOk(result);
        }
        return aResponse.sendErrorServer("Failed to update review");
    } catch (e) {
        return aResponse.sendErrorServer(e);
    }
}

export async function deleteOneReview(aRequest, aResponse) {
    const { reviewId } = aRequest.params;
    if (!reviewId) {
        return aResponse.sendErrorEmptyParam("reviewId");
    }
    if (!validator.isNumeric(reviewId)) {
        return aResponse.sendErrorClient(
            "Only numbers are allowed in the review ID parameter");
    }

    try {
        const reviewExists = await ReviewService.hasReviewWithId(reviewId);
        if (!reviewExists) {
            return aResponse.sendErrorClient("Review does not exist");
        }

        if (aRequest.you.cannot(Actions.DELETE, Subjects.REVIEW)) {
            return aResponse.sendErrorForbidden();
        }

        const result = await ReviewService.deleteOneReview(reviewId);
        if (result) {
            return aResponse.sendOk(result);
        }
        return aResponse.sendErrorServer("Failed to delete review");
    } catch (e) {
        return aResponse.sendErrorServer(e);
    }
}