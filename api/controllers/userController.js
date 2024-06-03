import * as emailValidator from "email-validator";
import validator from "validator";

import {
    Actions, FixedRole, Subjects,
} from "../enums.js";
import {
    FoodEstablishmentService,
    FoodItemService,
    FoodTypeService,
    IdentityService, ReviewService, UserService,
} from "../services/services.js";
import { hasValue } from "../utils.js";

export async function getAllUsers(aRequest, aResponse) {
    const properties = {};
    const { username, email, name } = aRequest.query;
    if (username) {
        properties.username = username;
    }
    if (email) {
        properties.email = email;
    }
    if (name) {
        if (!validator.isAlphanumeric(name)) {
            return aResponse.sendErrorClient(
                "Only alphanumeric characters are allowed in the name field");
        }
        properties.name = {
            operator: "LIKE",
            value: `%${name}%`,
        };
    }

    try {
        if (aRequest.you.cannot(Actions.READ, Subjects.USER)) {
            return aResponse.sendErrorForbidden();
        }
        const result = await UserService.getAllUsers(properties);
        return aResponse.sendOk(result);
    } catch (e) {
        return aResponse.sendErrorServer(e);
    }
}

export async function getOneUser(aRequest, aResponse) {
    const { userId } = aRequest.params;
    if (!userId) {
        return aResponse.sendErrorEmptyParam("userId");
    }
    if (!validator.isNumeric(userId)) {
        return aResponse.sendErrorClient(
            "Only numbers are allowed in the user ID parameter");
    }

    try {
        const result = await UserService.getOneUser(userId);
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

export async function createNewUser(aRequest, aResponse) {
    const { body } = aRequest;

    const requiredProps = [
        "username", "email", "password", "name",
    ];
    if (aResponse.sendErrorEmptyBody(requiredProps)) {
        return;
    }

    try {
        // Only administrators or unauthenticated users are allowed to create
        // new user accounts, while specifying custom roles is an exclusive
        // ability for administrators.
        let allowOverrides = false;
        if (aRequest.you.can(Actions.MANAGE, Subjects.ALL)) {
            allowOverrides = true;
        } else if (aRequest.isAuthenticated()) {
            return aResponse.sendErrorForbidden();
        }

        if (!validator.isAlphanumeric(body.username)) {
            return aResponse.sendErrorClient(
                "Only alphanumeric characters are allowed in the" +
                " username field");
        }

        const userExists = await UserService.hasUserWithUsername(body.username);
        if (userExists) {
            return aResponse.sendErrorClient(
                "Please use a different username");
        }
        const emailExists = await UserService.hasUserWithEmail(body.email);
        if (emailExists) {
            return aResponse.sendErrorClient(
                "Please use a different email address");
        }
        const emailInvalid = !emailValidator.validate(body.email);
        if (emailInvalid) {
            return aResponse.sendErrorClient(
                "Please use a valid email address");
        }

        let isEndUser = false;
        let isOwner = false;
        // Find ID from role name if specified.
        if (hasValue(body, "roleName")) {
            switch (body.roleName) {
            case FixedRole.END_USER:
                isEndUser = true;
                break;
            case FixedRole.OWNER:
                isOwner = true;
                break;
            case FixedRole.ADMIN:
                if (!allowOverrides) {
                    return aResponse.sendErrorClient(
                        "Please use a valid role name");
                }
                break;
            default:
                return aResponse.sendErrorClient(
                    "Please use a valid role name");
            }
        } else {
            isEndUser = true;
        }

        const { salt, key } = await IdentityService.deriveKeyFromPassword(
            body.password);
        const user = {
            name: body.name,
            password: key.toString("hex"),
            salt: salt.toString("hex"),
            username: body.username,
            email: body.email,
            is_owner: isOwner,
            is_end_user: isEndUser,
        };

        const result = await UserService.createNewUser(user);
        if (result) {
            return aResponse.sendOk(result);
        }

        return aResponse.sendErrorServer("Failed to create a new user");
    } catch (e) {
        return aResponse.sendErrorServer(e);
    }
}

export async function updateOneUser(aRequest, aResponse) {
    const { userId } = aRequest.params;
    if (!userId) {
        return aResponse.sendErrorEmptyParam("userId");
    }

    try {
        // FIXME: add ownership check.

        const userExists = await UserService.hasUserWithId(userId);
        if (!userExists) {
            return aResponse.sendErrorClient("User does not exist");
        }

        let properties = {};
        const { body } = aRequest;
        if ("username" in body) {
            return aResponse.sendErrorClient(
                "Changing the username is not allowed");
        }
        if (hasValue(body, "email")) {
            const emailExists = await UserService.hasUserWithEmail(body.email);
            if (emailExists) {
                return aResponse.sendErrorClient(
                    "Please use a different email address");
            }
            const emailInvalid = !emailValidator.validate(body.email);
            if (emailInvalid) {
                return aResponse.sendErrorClient(
                    "Please use a valid email address");
            }
            properties.email = body.email;
        }
        if (hasValue(body, "password")) {
            const { salt, key } = await IdentityService.deriveKeyFromPassword(
                body.password);
            properties.salt = salt.toString("hex");
            properties.password = key.toString("hex");
        }
        if (hasValue(body, "name")) {
            properties.name = body.name;
        }

        const result = await UserService.updateOneUser(userId, properties);
        if (result) {
            return aResponse.sendOk(result);
        }
        return aResponse.sendErrorServer("Failed to update user properties");
    } catch (e) {
        return aResponse.sendErrorServer(e);
    }
}

export async function deleteOneUser(aRequest, aResponse) {
    const { userId } = aRequest.params;
    if (!userId) {
        return aResponse.sendErrorEmptyParam("userId");
    }

    try {
        if (aRequest.you.cannot(Actions.MANAGE, Subjects.ALL)) {
            return aResponse.sendErrorForbidden();
        }

        const userExists = await UserService.hasUserWithId(userId);
        if (!userExists) {
            return aResponse.sendErrorClient("User does not exist");
        }

        const userIdProperty = { userid: userId };
        const reviewPersonalDeleteResult = await ReviewService.deleteAllReviews(
            userIdProperty);
        if (!reviewPersonalDeleteResult) {
            return aResponse.sendErrorServer("Failed to delete reviews");
        }

        const foodEstablishments = await FoodEstablishmentService.getAllEstablishments(
            userIdProperty);
        if (foodEstablishments.length > 0) {
            const foodEstablishmentIds = foodEstablishments.map(function(aValue) {
                return aValue.id;
            });
            const reviewEstablishmentDeleteResult = await ReviewService.deleteAllReviews({
                foodestid: {
                    operator: "IN",
                    value: foodEstablishmentIds,
                },
            });
            if (!reviewEstablishmentDeleteResult) {
                return aResponse.sendErrorServer("Failed to delete reviews for owned establishments");
            }
        }

        const foodTypeDeleteResult = await FoodTypeService.deleteAllFoodTypes(
            userIdProperty);
        if (!foodTypeDeleteResult) {
            return aResponse.sendErrorServer("Failed to delete food types");
        }
        const foodItemDeleteResult = await FoodItemService.deleteAllFoodItems(
            userIdProperty);
        if (!foodItemDeleteResult) {
            return aResponse.sendErrorServer("Failed to delete reviews");
        }
        const foodEstablishmentDeleteResult = await FoodEstablishmentService
            .deleteAllFoodEstablishments(userIdProperty);
        if (!foodEstablishmentDeleteResult) {
            return aResponse.sendErrorServer("Failed to delete food establishments");
        }

        const result = await UserService.deleteOneUser(userId);
        if (!result) {
            return aResponse.sendErrorServer("Failed to delete user");
        }
        return aResponse.sendOk(result);
    } catch (e) {
        return aResponse.sendErrorServer(e);
    }
}
