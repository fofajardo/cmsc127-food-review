import { isString } from "./utils.js";

const FixedRole = Object.freeze({
    UNSPECIFIED: "unspecified",
    END_USER: "end_user",
    OWNER: "owner",
    ADMIN: "admin",
    isDefined: function(aValue) {
        if (isString(aValue)) {
            const value = aValue.toLowerCase().trim();
            switch (value) {
            case FixedRole.UNSPECIFIED:
            case FixedRole.END_USER:
            case FixedRole.OWNER:
            case FixedRole.ADMIN:
                return true;
            default:
                break;
            }
        }
        return false;
    },
    parse: function(aValue) {
        if (!this.isDefined(aValue)) {
            return null;
        }
        return aValue;
    },
});

const ReviewType = Object.freeze({
    FOOD_ESTABLISHMENT: "food_establishment",
    FOOD_ITEM: "food_item",
    isDefined: function(aValue) {
        if (isString(aValue)) {
            const value = aValue.toLowerCase().trim();
            switch (value) {
            case ReviewType.FOOD_ESTABLISHMENT:
            case ReviewType.FOOD_ITEM:
                return true;
            default:
                break;
            }
        }
        return false;
    },
    parse: function(aValue) {
        if (!this.isDefined(aValue)) {
            return null;
        }
        return aValue;
    },
});

// XXX: This should be kept in sync with model names in /api/_models.js.
// I'm not exactly sure if there's a proper way to do this, but this
// is much better than typing the model names manually, which can be
// prone to typos and similar mistakes.
const Subjects = Object.freeze({
    ALL: "all",
    FOOD_ESTABLISHMENT: "FoodEstablishment",
    FOOD_ITEM: "FoodItem",
    FOOD_TYPE: "FoodType",
    REVIEW: "Review",
    USER: "User",
});

const Actions = Object.freeze({
    CREATE: "create",
    READ: "read",
    UPDATE: "update",
    DELETE: "delete",
    MANAGE: "manage",
});

export {
    FixedRole,
    ReviewType,
    Subjects,
    Actions,
};