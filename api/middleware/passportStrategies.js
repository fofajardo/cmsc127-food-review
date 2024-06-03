import passport from "passport";
import LocalStrategy from "passport-local";

import {
    IdentityService, UserService,
} from "../services/services.js";

const kInvalidUsernameOrEmail = {
    message: "Incorrect username or email"
};

async function handleLocalStrategy(aUsernameOrEmail, aPassword, aCallback) {
    let user = null;
    try {
        user = await UserService.getOneUserByUsernameOrEmail(aUsernameOrEmail);
        if (!user) {
            return aCallback(null, false, kInvalidUsernameOrEmail);
        }
        const matched = await IdentityService.matchesPassword(
            aPassword, user.salt, user.password);
        if (matched) {
            return aCallback(null, user);
        }
        return aCallback(null, false, kInvalidUsernameOrEmail);
    } catch (e) {
        return aCallback(e);
    }
}

function handleSerialize(aUser, aCallback) {
    process.nextTick(function () {
        aCallback(null, aUser.id);
    });
}

function handleDeserialize(aUserId, aCallback) {
    process.nextTick(async function () {
        const user = await UserService.getOneUser(aUserId);
        return aCallback(null, user);
    });
}

export function registerStrategies() {
    passport.use(new LocalStrategy(handleLocalStrategy));
    passport.serializeUser(handleSerialize);
    passport.deserializeUser(handleDeserialize);
}
