import type { DropFirstArg } from "@mansur-gabidullin/lib-types";

import { checkIsUserGuest } from "./methods/checkIsUserGuest";
import { createUserReference } from "./methods/createUserReference";
import { makeGuestABasicUser } from "./methods/makeGuestABasicUser";
import type { User } from "./user";
import type { Profile } from "../profile/profile";

type UserService = {
    checkIsGuest: DropFirstArg<typeof checkIsUserGuest>;
    makeAsBasic: DropFirstArg<typeof makeGuestABasicUser>;
    getReference: DropFirstArg<typeof createUserReference>;
};

export function UserService(user: User, profile?: Profile): UserService {
    return {
        checkIsGuest: () => checkIsUserGuest(user),
        makeAsBasic: () => makeGuestABasicUser(user),
        getReference: () => createUserReference({ user, profile }),
    };
}
