import passport from "passport";

async function signInGate(aRequest, aResponse, aNext) {
    if (aRequest.isAuthenticated()) {
        return aResponse.sendErrorClient("A user is already signed in");
    }
    return aNext();
}

const signInPassportLocal = passport.authenticate("local");

export async function signedInUser(aRequest, aResponse) {
    if (aRequest.user) {
        return aResponse.sendOk(aRequest.user);
    }
    return aResponse.sendOk(false);
}

export const signIn = [signInGate, signInPassportLocal, signedInUser];

export async function signOut(aRequest, aResponse) {
    if (aRequest.isUnauthenticated()) {
        return aResponse.sendOk(false);
    }
    return aRequest.logout(function(aError) {
        if (aError) {
            return aResponse.sendErrorServer(aError);
        }
        return aResponse.sendOk(true);
    });
}

export async function dumpSession(aRequest, aResponse) {
    console.log(aRequest.session);
    console.log("Dumping session.");
    return aResponse.sendOk(aRequest.session);
}
