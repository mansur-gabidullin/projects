import type { DistributiveOmit, DropFirstArg } from "@mansur-gabidullin/lib-types";

import { type Account, type AccountId, type AccountType, AccountTypeEnum } from "./account";
import { type AccountCreatedEvent, createAccountCreatedEvent } from "./account.events";
import type { IdGenerator } from "../../shared-kernel";

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

function createRootAccount(id: AccountId, params: CreateAccountParams<RootAccount>): RootAccount {
    const createdAt = new Date();

    return Object.freeze({
        id,
        type: AccountTypeEnum.ROOT,
        userId: params.userId,
        createdAt,
        updatedAt: createdAt,
    });
}

function createDelegatedAccount(id: AccountId, params: CreateAccountParams<DelegatedAccount>): DelegatedAccount {
    return Object.freeze({
        ...createCommonAccountPart(params),
        id,
        type: AccountTypeEnum.DELIGATION,
        delegated_from_account_id: params.delegated_from_account_id,
    });
}

function createCommonAccount(id: AccountId, params: CreateAccountParams<CommonAccount>) {
    return Object.freeze({
        ...createCommonAccountPart(params),
        id,
        type: params.type,
    });
}

function createAccount(
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

type AccountFactory = {
    create: DropFirstArg<typeof createAccount>;
};

export function AccountFactory(idGenerator: IdGenerator): AccountFactory {
    const createAccountId = idGenerator.createId<AccountId>;

    return {
        create: params => createAccount(createAccountId(), params),
    };
}
