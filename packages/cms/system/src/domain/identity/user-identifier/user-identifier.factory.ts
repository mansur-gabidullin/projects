import type { DropFirstArg } from "@mansur-gabidullin/lib-types";

import type { IdGenerator } from "@domain/shared-kernel";

import { createUserIdentifier } from "./methods/createUserIdentifier";
import { type UserIdentifierId } from "./user-identifier";

type UserIdentifierFactory = Readonly<{
    create: DropFirstArg<typeof createUserIdentifier>;
}>;

export function UserIdentifierFactory(idGenerator: IdGenerator): UserIdentifierFactory {
    const createUserIdentifierId = idGenerator.createId<UserIdentifierId>;

    return Object.freeze({
        create: params => createUserIdentifier(createUserIdentifierId(), params),
    });
}
