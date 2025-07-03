import type { DropFirstArg } from "@mansur-gabidullin/lib-types";

import { checkIsUserGuest } from "./methods/checkIsUserGuest";
import { makeGuestABasicUser } from "./methods/makeGuestABasicUser";
import type { User } from "./user";

type UserService = Readonly<{
    checkIsGuest: DropFirstArg<typeof checkIsUserGuest>;
    makeAsBasic: DropFirstArg<typeof makeGuestABasicUser>;
}>;

export function UserService(user: User): UserService {
    return Object.freeze({
        checkIsGuest: () => checkIsUserGuest(user),
        makeAsBasic: () => makeGuestABasicUser(user),
    });
}
