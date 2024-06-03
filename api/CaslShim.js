/*
 * A quick and dirty Casl.js shim.
 */

/**
 * @param {String} aRole
 * @param {String} aAction
 * @param {String} aSubject
 * @returns {Boolean}
 */
function can(aRole, aAction, aSubject) {
    return true;
}

/**
 * @param {String} aRole
 * @param {String} aAction
 * @param {String} aSubject
 * @returns {Boolean}
 */
function cannot(aRole, aAction, aSubject) {
    return !can(aRole, aAction, aSubject);
}

export { can, cannot };
