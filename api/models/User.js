function User(aRow) {
    /** @type {Number} */
    this.id = aRow.userid;
    /** @type {String} */
    this.name = aRow.name;
    /** @type {String} */
    this.password = aRow.password;
    /** @type {String} */
    this.salt = aRow.salt;
    /** @type {String} */
    this.username = aRow.username;
    /** @type {String} */
    this.email = aRow.email;
    /** @type {Boolean} */
    this.isOwner = aRow.is_owner == 1;
    /** @type {Boolean} */
    this.isEndUser = aRow.is_end_user == 1;
}

User.prototype.toValues = function() {
    return [
        this.id,
        this.name,
        this.password,
        this.salt,
        this.username,
        this.email,
        this.isOwner,
        this.isEndUser,
    ];
};

/** @param {Array} aRows */
User.fromRows = function(aRows) {
    const users = [];
    for (let i = 0; i < aRows.length; i++) {
        users.push(new User(aRows[i]));
    }
    return users;
};

export { User };
