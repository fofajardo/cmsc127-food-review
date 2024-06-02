export function FoodEstablishment(aRow) {
    /** @type {Number} */
    this.id = aRow.foodestid;
    /** @type {Number} */
    this.userId = aRow.userid;
    /** @type {String} */
    this.name = aRow.name;
    /** @type {String} */
    this.location = aRow.location;
}

FoodEstablishment.prototype.toValues = function() {
    return [
        this.id,
        this.userId,
        this.name,
        this.location,
    ];
};

/** @param {Array} aRows */
FoodEstablishment.fromRows = function(aRows) {
    const foodEstablishments = [];
    for (let i = 0; i < aRows.length; i++) {
        foodEstablishments.push(new FoodEstablishment(aRows[i]));
    }
    return foodEstablishments;
};
