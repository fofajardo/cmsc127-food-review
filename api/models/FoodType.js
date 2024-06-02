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
