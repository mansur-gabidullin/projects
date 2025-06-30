import type { IdGenerator, UserId } from "@domain/shared-kernel";

import { createUser } from "./methods/createUser";
import type { UserType } from "./user";

type UserFactory = Readonly<{
    create: <Type extends UserType>(type: Type) => ReturnType<typeof createUser<Type>>;
}>;

export function UserFactory(idGenerator: IdGenerator): UserFactory {
    const createUserId = idGenerator.createId<UserId>;

    return Object.freeze({
        create: type => createUser(createUserId(), type),
    });
}
