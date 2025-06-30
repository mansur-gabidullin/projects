import type { DistributiveOmit } from "@mansur-gabidullin/lib-types";

import { type Account, type AccountId, AccountTypeEnum } from "../account";
import type { AccountCreatedEvent } from "../account.event";
import { createAccountCreatedEvent } from "./createAccountCreatedEvent";
import { createCommonAccount } from "./createCommonAccount";
import { createDelegatedAccount } from "./createDelegatedAccount";
import { createRootAccount } from "./createRootAccount";

export type CreateAccountParams<A extends Account> = DistributiveOmit<A, "id" | "createdAt" | "updatedAt">;

export function createAccount(
    id: AccountId,
    params: CreateAccountParams<Account>,
): [
    (
        | ReturnType<typeof createRootAccount>
        | ReturnType<typeof createDelegatedAccount>
        | ReturnType<typeof createCommonAccount>
    ),
    AccountCreatedEvent,
] {
    let account;

    if (params.type === AccountTypeEnum.ROOT) {
        account = createRootAccount(id, params);
    } else if (params.type === AccountTypeEnum.DELIGATION) {
        account = createDelegatedAccount(id, params);
    } else {
        account = createCommonAccount(id, params);
    }

    return [account, createAccountCreatedEvent(account.id)];
}
