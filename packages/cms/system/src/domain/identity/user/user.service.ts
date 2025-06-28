import type { DropFirstArg } from "@mansur-gabidullin/lib-types";
import { Result } from "@mansur-gabidullin/lib-utils";

import { type Guest, type User, UserTypeEnum } from "./user";
import { createUserIsNotGuestError, type UserIsNotGuestError } from "./user.errors";
import { createUserTypeChangedToBasicEvent, type UserTypeChangedToBasicEvent } from "./user.events";
import type { UserReference } from "../../shared-kernel";
import type { Profile } from "../profile/profile";

function checkIsUserGuest(user: User): user is Guest {
    return user.type === UserTypeEnum.GUEST;
}

function makeGuestABasicUser(user: User): Result<[User, UserTypeChangedToBasicEvent], UserIsNotGuestError> {
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

function createUserReference(deps: { user: User; profile: Profile | undefined }): UserReference {
    const { user, profile } = deps;
    const id = user.id;

    if (profile) {
        const { displayName, avatarUrl } = profile;

        return Object.freeze({
            id,
            displayName,
            avatarUrl,
        });
    }

    return Object.freeze({
        id,
    });
}

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
