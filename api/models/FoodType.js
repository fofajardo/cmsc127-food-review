export function FoodType(aRow) {
    /** @type {Number} */
    this.foodItemId = aRow.fooditemid;
    /** @type {String} */
    this.type = aRow.type;
}

FoodType.prototype.toValues = function() {
    return [
        this.foodItemId,
        this.type,
    ];
};

/** @param {Array} aRows */
FoodType.fromRows = function(aRows) {
    const foodTypes = [];
    for (let i = 0; i < aRows.length; i++) {
        foodTypes.push(new FoodType(aRows[i]));
    }
    return foodTypes;
};
