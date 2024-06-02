export function RequireAuthenticated(aRequest, aResponse, aNext) {
    if (aRequest.isAuthenticated() || aRequest.hasSpecialPowers) {
        return aNext();
    }
    return aResponse.sendErrorUnauthenticated();
}
