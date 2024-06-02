import { IdentityService } from "../services/services.js";
import { FixedRole, Actions, Subjects } from "../enums.js";
import { can, cannot } from "../CaslShim.js";

async function InferAbility(aRequest, aResponse, aNext) {
    let roleName = FixedRole.UNSPECIFIED;
    if (aRequest.user != null) {
        if (aRequest?.user.isOwner) {
            roleName = FixedRole.OWNER;
        } else if (aRequest?.user.isEndUser) {
            roleName = FixedRole.END_USER;
        } else {
            roleName = FixedRole.ADMIN;
        }
    }

    aRequest.you = {
        can: (aAction, aSubject) => can(roleName, aAction, aSubject),
        cannot: (aAction, aSubject) => cannot(roleName, aAction, aSubject),
    };

    aNext();
}

export { InferAbility };
