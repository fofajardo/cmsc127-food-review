import { inspect as doInspect } from "node:util";

function isString(aValue) {
    return (typeof aValue === "string" || aValue instanceof String);
}

function isDateRangeValid(aStart, aEnd) {
    const startTime = aStart.getTime();
    const endTime = aEnd.getTime();
    if (isNaN(startTime) || isNaN(endTime)) {
        return false;
    }
    if (startTime > endTime || endTime < startTime || startTime === endTime) {
        return false;
    }
    return true;
}

function parseBool(aValue) {
    if (isString(aValue)) {
        return aValue.trim().toLowerCase() === "true";
    } else if (typeof aValue === "boolean") {
        return aValue;
    }
    return false;
}

function hasValue(aTarget, aPropName) {
    let value = aTarget[aPropName];
    let valueInTarget = aPropName in aTarget;
    let valueIsNotNull = value != null;
    let valueIsEmptyString = false;
    if (isString(value)) {
        valueIsEmptyString = value.trim() === "";
    }
    return valueInTarget && valueIsNotNull && !valueIsEmptyString;
}

function hasNull(aTarget, aValues) {
    if (!Array.isArray(aValues)) {
        aValues = [aValues];
    }

    const nullValues = [];
    for (let i = 0; i < aValues.length; i++) {
        let value = aValues[i];
        if (hasValue(aTarget, value)) {
            continue;
        }
        nullValues.push(value);
    }

    if (nullValues.length == 0) {
        return null;
    }
    return nullValues;
}

function inspect(aObject) {
    return doInspect(aObject, false, null, true);
}

function minutesToMs(minutes) {
    return minutes * 60 * 1000;
}

export {
    hasNull,
    hasValue,
    inspect,
    isDateRangeValid,
    isString,
    minutesToMs,
    parseBool,
};