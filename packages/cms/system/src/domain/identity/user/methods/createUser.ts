import type { UserId } from "@domain/shared-kernel";

import type { User, UserType } from "../user";
import type { UserCreatedEvent } from "../user.event";
import { createUserCreatedEvent } from "./createUserCreatedEvent";

export function createUser<Type extends UserType>(
    id: UserId,
    type: Type,
): [Omit<User, "type"> & { type: Type }, UserCreatedEvent] {
    const createdAt = new Date();

    return [
        Object.freeze({
            id,
            type,
            createdAt: createdAt,
            updatedAt: createdAt,
        }),
        createUserCreatedEvent(id),
    ];
}
