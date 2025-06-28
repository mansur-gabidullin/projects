import type { IdGenerator, UserId } from "@domain/shared-kernel";

import type { User, UserType } from "./user";
import { createUserCreatedEvent, type UserCreatedEvent } from "./user.events";

function createUser<Type extends UserType>(
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

type UserFactory = {
    create: <Type extends UserType>(type: Type) => ReturnType<typeof createUser<Type>>;
};

export function UserFactory(idGenerator: IdGenerator): UserFactory {
    const createUserId = idGenerator.createId<UserId>;

    return {
        create: type => createUser(createUserId(), type),
    };
}
