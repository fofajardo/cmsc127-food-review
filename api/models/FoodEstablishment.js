function FoodEstablishment(aRow) {
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

export { FoodEstablishment };
