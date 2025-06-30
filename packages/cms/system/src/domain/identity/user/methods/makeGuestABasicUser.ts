import { Result } from "@mansur-gabidullin/lib-utils";

import { type User, UserTypeEnum } from "../user";
import type { UserIsNotGuestError } from "../user.error";
import type { UserTypeChangedToBasicEvent } from "../user.event";
import { checkIsUserGuest } from "./checkIsUserGuest";
import { createUserIsNotGuestError } from "./createUserIsNotGuestError";
import { createUserTypeChangedToBasicEvent } from "./createUserTypeChangedToBasicEvent";

export function makeGuestABasicUser(user: User): Result<[User, UserTypeChangedToBasicEvent], UserIsNotGuestError> {
    if (!checkIsUserGuest(user)) {
        return Result.error(createUserIsNotGuestError(user.id));
    }

    return Result.ok([
        Object.freeze({
            ...user,
            updatedAt: new Date(),
            type: UserTypeEnum.BASIC,
        }),
        createUserTypeChangedToBasicEvent(user.id),
    ]);
}
