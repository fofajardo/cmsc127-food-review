import { Review } from "../../models/_models.js";
import { selectAll, insert, updateAll, deleteAll } from "../db.js";

const kTableName = "`review`";

export async function getAllReviews(aProperties) {
    const queryResults = await selectAll(kTableName, aProperties);
    return Review.fromRows(queryResults);
}

export async function getOneReview(aId) {
    const queryResults = await selectAll(kTableName, { reviewid: aId });
    if (queryResults.length === 0) {
        return null;
    }
    return new Review(queryResults[0]);
}

export async function hasReviewWithId(aId) {
    const queryResults = await selectAll(kTableName, { reviewid: aId });
    return queryResults.length > 0;
}

export async function createNewReview(aReview) {
    const queryResults = await insert(kTableName, aReview.toValues());
    return queryResults.affectedRows === 1;
}

export async function updateOneReview(aId, aProperties) {
    const queryResults = await updateAll(kTableName, aProperties, { reviewid: aId });
    return queryResults.affectedRows > 0;
}

export async function deleteAllReviews(aProperties) {
    const selectResults = await selectAll(kTableName, aProperties);
    if (selectResults.length == 0) {
        return true;
    }
    const queryResults = await deleteAll(kTableName, aProperties);
    return queryResults.affectedRows == selectResults.length;
}

export async function deleteOneReview(aId) {
    const queryResults = await deleteAll(kTableName, { reviewid: aId });
    return queryResults.affectedRows === 1;
}