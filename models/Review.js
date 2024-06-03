export function Review(aRow) {
    /** @type {Number} */
    this.id = aRow.reviewid;
    /** @type {String} */
    this.type = aRow.type;
    /** @type {String} */
    this.note = aRow.note;
    /** @type {String} */
    this.date = aRow.date;
    /** @type {Number} */
    this.rating = aRow.rating;
    /** @type {Number} */
    this.userId = aRow.userid;
    /** @type {Number} */
    this.foodDestinationId = aRow.foodestid;
    /** @type {Number} */
    this.foodItemId = aRow.fooditemid;
    if (aRow.name) {
        /** @type {String} */
        this.reviewerName = aRow.name;
    }
    if (aRow.username) {
        /** @type {String} */
        this.reviewerUsername = aRow.username;
    }
}

Review.prototype.toValues = function() {
    return [
        this.id,
        this.type,
        this.note,
        this.date,
        this.rating,
        this.userId,
        this.foodDestinationId,
        this.foodItemId,
    ];
};

/** @param {Array} aRows */
Review.fromRows = function(aRows) {
    const reviews = [];
    for (let i = 0; i < aRows.length; i++) {
        reviews.push(new Review(aRows[i]));
    }
    return reviews;
};
