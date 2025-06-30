import type { DropFirstArg } from "@mansur-gabidullin/lib-types";

import type { IdGenerator } from "@domain/shared-kernel";

import { type Account, type AccountId, type AccountType, AccountTypeEnum } from "./account";
import { createAccount } from "./methods/createAccount";

export type RootAccount = Extract<Account, { type: AccountTypeEnum["ROOT"] }>;

export type DelegatedAccount = Extract<Account, { type: AccountTypeEnum["DELIGATION"] }>;

export type CommonAccountType = Exclude<AccountType, AccountTypeEnum["ROOT"] | AccountTypeEnum["DELIGATION"]>;

export type CommonAccount = Extract<Account, { type: CommonAccountType }>;

type AccountFactory = {
    create: DropFirstArg<typeof createAccount>;
};

export function AccountFactory(idGenerator: IdGenerator): AccountFactory {
    const createAccountId = idGenerator.createId<AccountId>;

    return {
        create: params => createAccount(createAccountId(), params),
    };
}
