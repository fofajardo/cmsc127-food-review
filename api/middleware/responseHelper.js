import { inspect } from "node:util";

import { StatusCodes } from "http-status-codes";

import {
    hasNull, isString,
} from "../utils.js";

const LOG = true;
const FILTER = [];
const TRACE_SERVER_ERROR = false;
const TRACE_UNAUTHORIZED = false;
const TRACE_BAD_REQUEST = false;
const TRACE_FORBIDDEN = false;
const TRACE_ALL = false;

export function ResponseHelper(aRequest, aResponse, aNext) {
    aResponse.sendOne = function(aStatusCode, aStatusText, aData) {
        const body = {
            status: aStatusText,
            data: aData
        };
        // Dump entire response body to console if we're logging info.
        const passedFilter = FILTER.length == 0 ||
            FILTER.some(keyword => aRequest.originalUrl?.includes(keyword));
        if (LOG && passedFilter) {
            console.log("");
            console.log(`${aRequest.method} (${aStatusCode}) ${aRequest.originalUrl}`);
            if (aRequest.hasSpecialPowers) {
                console.log("<request has special powers>");
            }
            console.log(new Date());
            console.log(inspect(body, false, null, true));
        }
        let traceReason = null;
        if ((TRACE_SERVER_ERROR && aStatusCode == StatusCodes.INTERNAL_SERVER_ERROR) ||
            (TRACE_UNAUTHORIZED && aStatusCode == StatusCodes.UNAUTHORIZED) ||
            (TRACE_BAD_REQUEST && aStatusCode == StatusCodes.BAD_REQUEST) ||
            (TRACE_FORBIDDEN && aStatusCode == StatusCodes.FORBIDDEN) ||
            (TRACE_ALL)) {
            traceReason = aStatusCode;
        }
        if (traceReason != null) {
            console.trace(traceReason);
        }
        aResponse
            .status(aStatusCode)
            .send(body);
        return true;
    };

    aResponse.sendError = function(aError, aStatus) {
        var error = aError;
        // Take only the message if we have an error object.
        if (aError instanceof Error) {
            error = {
                message: aError.message
            };
        } else if (isString(aError)) {
            error = {
                message: aError
            };
        }
        return aResponse.sendOne(aStatus, "FAILED", { error });
    };

    aResponse.sendErrorServer = function(aError) {
        return aResponse.sendError(
            aError,
            StatusCodes.INTERNAL_SERVER_ERROR);
    };

    aResponse.sendErrorClient = function(aError) {
        return aResponse.sendError(
            aError,
            StatusCodes.BAD_REQUEST);
    };

    aResponse.sendErrorEmptyParam = function(aName) {
        return aResponse.sendError(
            {
                message: "Parameter cannot be empty",
                paramName: aName
            },
            StatusCodes.BAD_REQUEST);
    };

    aResponse.sendErrorEmptyBody = function(aValues) {
        const fieldNames = hasNull(aRequest.body, aValues);

        if (fieldNames) {
            return aResponse.sendError(
                {
                    message: "One or more required fields are missing or empty",
                    fieldNames
                },
                StatusCodes.BAD_REQUEST);
        }

        return false;
    };

    aResponse.sendErrorUnauthenticated = function() {
        return aResponse.sendError(
            {
                message: "Authentication is required to use this API",
            },
            StatusCodes.UNAUTHORIZED);
    };

    aResponse.sendErrorForbidden = function() {
        return aResponse.sendError(
            {
                message: "This action is forbidden",
            },
            StatusCodes.FORBIDDEN);
    };

    aResponse.sendErrorNotFound = function() {
        return aResponse.sendError(
            {
                message: "The requested resource was not found",
            },
            StatusCodes.NOT_FOUND);
    };

    aResponse.sendOk = function(aData) {
        return aResponse.sendOne(StatusCodes.OK, "OK", aData);
    };

    return aNext();
}
