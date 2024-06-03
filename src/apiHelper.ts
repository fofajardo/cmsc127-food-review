export function createUrlsFor(aHostUrl: String) {
    const BASE_URLS = {
        users:               (aAppend = "") => `${aHostUrl}users/${aAppend}`,
        foodItems:           (aAppend = "") => `${aHostUrl}food-items/${aAppend}`,
        foodTypes:           (aAppend = "") => `${aHostUrl}food-types/${aAppend}`,
        foodEstablishments:  (aAppend = "") => `${aHostUrl}food-establishments/${aAppend}`,
        auth:                (aAppend = "") => `${aHostUrl}auth/${aAppend}`,
        reviews:             (aAppend = "") => `${aHostUrl}reviews/${aAppend}`,
    };
    const ALL_URLS = {
        ...BASE_URLS,
        foodTypesOfFoodItem: (aId: String, aAppend = "") => BASE_URLS.foodItems(`${aId}/types/${aAppend}`),
    };
    return ALL_URLS;
}

export const HOST_URL = "http://localhost:5173/api/";

export const apiUrls = createUrlsFor(HOST_URL);
