import type { Result } from "@mansur-gabidullin/lib-utils";

import type { UserIdentifier, UserIdentifierId } from "../user-identifier";

export type UserIdentifierRepository = Readonly<{
    getById: (id: UserIdentifierId) => Promise<Result<UserIdentifier, Error>>;
}>;
