import type { DistributiveOmit } from "@mansur-gabidullin/lib-types";

import { type AccountCreatedEvent, createAccountCreatedEvent } from "@domain/identity/account/account-event.ts";
import { createId } from "@domain/shared-kernel";

import { type Account, type AccountId, type AccountType, AccountTypeEnum } from "./account.ts";

export type RootAccount = Extract<Account, { type: AccountTypeEnum["ROOT"] }>;

export type DelegatedAccount = Extract<Account, { type: AccountTypeEnum["DELIGATION"] }>;

export type CommonAccountType = Exclude<AccountType, AccountTypeEnum["ROOT"] | AccountTypeEnum["DELIGATION"]>;

export type CommonAccount = Extract<Account, { type: CommonAccountType }>;

type CreateAccountParams<A extends Account> = DistributiveOmit<A, "id" | "createdAt" | "updatedAt">;

function createCommonAccountPart(
    params: Omit<CreateAccountParams<CommonAccount>, "type">,
): Omit<CreateAccountParams<CommonAccount>, "type"> & Pick<Account, "createdAt" | "updatedAt"> {
    const createdAt = new Date();

    return {
        userId: params.userId,
        status: params.status,
        scope: params.scope,
        expiresAt: params.expiresAt,
        createdAt,
        updatedAt: createdAt,
    };
}

function createRootAccount(params: CreateAccountParams<RootAccount>): RootAccount {
    const createdAt = new Date();

    return Object.freeze({
        id: createId<AccountId>(),
        type: AccountTypeEnum.ROOT,
        userId: params.userId,
        createdAt,
        updatedAt: createdAt,
    });
}

function createDelegatedAccount(params: CreateAccountParams<DelegatedAccount>): DelegatedAccount {
    return Object.freeze({
        ...createCommonAccountPart(params),
        id: createId<AccountId>(),
        type: AccountTypeEnum.DELIGATION,
        delegated_from_account_id: params.delegated_from_account_id,
    });
}

function createCommonAccount(params: CreateAccountParams<CommonAccount>) {
    return Object.freeze({
        ...createCommonAccountPart(params),
        id: createId<AccountId>(),
        type: params.type,
    });
}

export function createAccount(
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
        account = createRootAccount(params);
    } else if (params.type === AccountTypeEnum.DELIGATION) {
        account = createDelegatedAccount(params);
    } else {
        account = createCommonAccount(params);
    }

    return [account, createAccountCreatedEvent(account.id)];
}
