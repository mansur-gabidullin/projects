import { Result } from "@mansur-gabidullin/lib-utils";

import type { UserId } from "@domain/shared-kernel";

import type { User } from "../user";

export type UserRepository = {
    getById: (id: UserId) => Promise<Result<User, Error>>;
};
