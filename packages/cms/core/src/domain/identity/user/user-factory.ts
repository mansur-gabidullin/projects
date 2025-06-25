import { createUserCreatedEvent, type UserCreatedEvent } from "@domain/identity/user/user-event.ts";
import { createId, type UserId, type UserReference } from "@domain/shared-kernel";

import { type User, type UserType, UserTypeEnum } from "./user.ts";
import type { Profile } from "../profile/profile.ts";

export function createUserId(): UserId {
    return createId<UserId>();
}

export function createUser<Type extends UserType>(type: Type): [Omit<User, "type"> & { type: Type }, UserCreatedEvent] {
    const id = createUserId();

    return [
        Object.freeze({
            id,
            type,
            createdAt: new Date(),
        }),
        createUserCreatedEvent(id),
    ];
}

export function createBasicUser(): ReturnType<typeof createUser<UserTypeEnum["BASIC"]>> {
    return createUser(UserTypeEnum.BASIC);
}

export function createGuestUser(): ReturnType<typeof createUser<UserTypeEnum["GUEST"]>> {
    return createUser(UserTypeEnum.GUEST);
}

export function createUserReference(user: User, profile?: Profile): UserReference {
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
