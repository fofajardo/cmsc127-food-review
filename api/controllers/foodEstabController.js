import validator from "validator";

import {
    Actions, Subjects,
} from "../enums.js";
import {
    EstablishmentService
} from "../services/services.js";
import { hasValue } from "../utils.js";

export async function getAllEstablishments(aRequest, aResponse) {
    const properties = {};
    const { id, name, location } = aRequest.query;
    if (id) {
        if (!validator.isNumeric(id)) {
            return aResponse.sendErrorClient("ID must be a number");
        }
        properties.fooditemid = id;
    }
    if (name) {
        properties.name = {
            operator: "LIKE",
            value: `%${name}%`,
        };
    }
    if (location) {
        properties.location = {
            operator: "LIKE",
            value: `%${location}%`,
        };
    }

    try {
        if (aRequest.you.cannot(Actions.READ, Subjects.FOOD_ESTABLISHMENT)) {
            return aResponse.sendErrorForbidden();
        }
        const result = await EstablishmentService.getAllEstablishments(properties);
        return aResponse.sendOk(result);
    } catch (e) {
        return aResponse.sendErrorServer(e);
    }
}

export async function getOneEstablishment(aRequest, aResponse) {
    const { establishmentId } = aRequest.params;
    if (!establishmentId) {
        return aResponse.sendErrorEmptyParam("establishmentId");
    }
    if (!validator.isNumeric(establishmentId)) {
        return aResponse.sendErrorClient("Only numbers are allowed in the food establishment ID parameter");
    }

    try {
        const result = await EstablishmentService.getOneEstablishment(establishmentId);
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

export async function createNewEstablishment(aRequest, aResponse) {
    const { body } = aRequest;

    const requiredProps = ["name", "location"];
    if (aResponse.sendErrorEmptyBody(requiredProps)) {
        return;
    }

    try {
        if (!validator.isAlphanumeric(body.name)) {
            return aResponse.sendErrorClient("Only alphanumeric characters are allowed in the name field");
        }

        const establishmentExists = await EstablishmentService.hasEstablishmentWithName(body.name);
        if (establishmentExists) {
            return aResponse.sendErrorClient("Please use a different name");
        }

        const foodEstablishment = {
            foodestname: body.name,
            location: body.location,
            userid: aRequest?.user?.id
        };

        const result = await EstablishmentService.createNewEstablishment(foodEstablishment);
        if (result) {
            return aResponse.sendOk(result);
        }

        return aResponse.sendErrorServer("Failed to create a new food establishment");
    } catch (e) {
        return aResponse.sendErrorServer(e);
    }
}

export async function updateOneEstablishment(aRequest, aResponse) {
    const { establishmentId } = aRequest.params;
    if (!establishmentId) {
        return aResponse.sendErrorEmptyParam("establishmentId");
    }
    if (!validator.isNumeric(establishmentId)) {
        return aResponse.sendErrorClient("Only numbers are allowed in the food establishment ID parameter");
    }

    try {
        const establishmentExists = await EstablishmentService.hasEstablishmentWithId(establishmentId);
        if (!establishmentExists) {
            return aResponse.sendErrorClient("Establishment does not exist");
        }

        let properties = {};
        const { body } = aRequest;
        if ("userId" in body) {
            return aResponse.sendErrorClient("Changing the user is not allowed");
        }
        if (hasValue(body, "name")) {
            if (!validator.isAlphanumeric(body.name)) {
                return aResponse.sendErrorClient("Only alphanumeric characters are allowed in the name field");
            }
            properties.name = body.name;
        }
        if (hasValue(body, "location")) {
            properties.location = body.location;
        }

        const result = await EstablishmentService.updateOneEstablishment(establishmentId, properties);
        if (result) {
            return aResponse.sendOk(result);
        }
        return aResponse.sendErrorServer("Failed to update establishment properties");
    } catch (e) {
        return aResponse.sendErrorServer(e);
    }
}

export async function deleteOneEstablishment(aRequest, aResponse) {
    const { establishmentId } = aRequest.params;
    if (!establishmentId) {
        return aResponse.sendErrorEmptyParam("establishmentId");
    }
    if (!validator.isNumeric(establishmentId)) {
        return aResponse.sendErrorClient("Only numbers are allowed in the food establishment ID parameter");
    }

    try {
        if (aRequest.you.cannot(Actions.MANAGE, Subjects.ALL)) {
            return aResponse.sendErrorForbidden();
        }

        const establishmentExists = await EstablishmentService.hasEstablishmentWithId(establishmentId);
        if (!establishmentExists) {
            return aResponse.sendErrorClient("Establishment does not exist");
        }

        const result = await EstablishmentService.deleteOneEstablishment(establishmentId);
        if (!result) {
            return aResponse.sendErrorServer("Failed to delete establishment");
        }
        return aResponse.sendOk(result);
    } catch (e) {
        return aResponse.sendErrorServer(e);
    }
}