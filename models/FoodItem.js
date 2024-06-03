import { FoodEstablishment } from "./FoodEstablishment.js";

export function FoodItem(aRow) {
    /** @type {Number} */
    this.id = aRow.fooditemid;
    /** @type {String} */
    this.name = aRow.fooditemname;
    /** @type {Number} */
    this.price = aRow.price;
    /** @type {Number} */
    this.userId = aRow.userid;
    /** @type {Number} */
    this.foodEstablishmentId = aRow.foodestid;
    if (aRow.location && aRow.foodestname) {
        /** @type {FoodEstablishment} */
        this.foodEstablishment = new FoodEstablishment(aRow);
    }
    if (aRow.types) {
        /** @type {String} */
        this.types = aRow.types;
    }
}

FoodItem.prototype.toValues = function() {
    return [
        this.id,
        this.name,
        this.price,
        this.userId,
        this.foodEstablishmentId,
    ];
};

/** @param {Array} aRows */
FoodItem.fromRows = function(aRows) {
    const foodItems = [];
    for (let i = 0; i < aRows.length; i++) {
        foodItems.push(new FoodItem(aRows[i]));
    }
    return foodItems;
};
