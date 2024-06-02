import passport from "passport";
import LocalStrategy from "passport-local";

import {
    IdentityService, UserService,
} from "../services/services.js";

const kInvalidUsernameOrEmail = {
    message: "Incorrect username or email"
};

function registerStrategies() {
    passport.use(new LocalStrategy(async function (aUsernameOrEmail, aPassword, aCallback) {
        let user = null;
        try {
            user = await UserService.getOneUserByUsernameOrEmail(aUsernameOrEmail);
            if (!user) {
                return aCallback(null, false, kInvalidUsernameOrEmail);
            }
            const matched = await IdentityService.matchesPassword(aPassword, user.salt, user.password);
            if (matched) {
                return aCallback(null, user);
            }
            return aCallback(null, false, kInvalidUsernameOrEmail);
        } catch (e) {
            return aCallback(e);
        }
    }));

    passport.serializeUser(function (aUser, aCallback) {
        process.nextTick(function () {
            aCallback(null, aUser.id);
        });
    });

    passport.deserializeUser(function (aUserId, aCallback) {
        process.nextTick(async function () {
            const user = await UserService.getOneUser(aUserId);
            return aCallback(null, user);
        });
    });
}

export { registerStrategies };
