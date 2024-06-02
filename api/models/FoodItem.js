export function FoodItem(aRow) {
    /** @type {Number} */
    this.id = aRow.fooditemid;
    /** @type {String} */
    this.name = aRow.name;
    /** @type {Number} */
    this.price = aRow.price;
    /** @type {Number} */
    this.userId = aRow.userid;
    /** @type {Number} */
    this.foodEstablishmentId = aRow.foodestid;
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
