import { Result } from "@mansur-gabidullin/lib-utils";

import type { Account, AccountId } from "../account";

export type AccountRepository = Readonly<{
    getById: (id: AccountId) => Promise<Result<Account, Error>>;
}>;
