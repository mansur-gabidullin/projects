import type { DropFirstArg } from "@mansur-gabidullin/lib-types";

import type { AccountId } from "./account";
import type { IdGenerator } from "../shared-kernel";
import { createAccount } from "./methods/createAccount";

type AccountFactory = Readonly<{
    create: DropFirstArg<typeof createAccount>;
}>;

export function AccountFactory(idGenerator: IdGenerator): AccountFactory {
    const createAccountId = idGenerator.createId<AccountId>;

    return Object.freeze({
        create: params => createAccount(createAccountId(), params),
    });
}
