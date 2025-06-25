import { type AccountCreatedEvent, createAccountCreatedEvent } from "@domain/identity/account/account-event.ts";
import { createId } from "@domain/shared-kernel";

import { type Account, type AccountId, type AccountType, AccountTypeEnum } from "./account.ts";

type CreateAccountParams<Type extends AccountType> = Omit<Extract<Account, { type: Type }>, "id" | "createdAt">;

type CommonAccountType = Exclude<AccountType, AccountTypeEnum["ROOT"] | AccountTypeEnum["DELIGATION"]>;

type CommonCreateAccountParams = Omit<CreateAccountParams<CommonAccountType>, "type">;

function createCommonAccountPart(
    data: CommonCreateAccountParams,
): CommonCreateAccountParams & Pick<Account, "createdAt"> {
    return {
        userId: data.userId,
        status: data.status,
        scope: data.scope,
        expiresAt: data.expiresAt,
        createdAt: new Date(),
    };
}

function createRootAccount(
    data: CreateAccountParams<AccountTypeEnum["ROOT"]>,
): Extract<Account, { type: AccountTypeEnum["ROOT"] }> {
    return Object.freeze({
        id: createId<AccountId>(),
        type: AccountTypeEnum.ROOT,
        userId: data.userId,
        createdAt: new Date(),
    });
}

function createDelegatedAccount(
    data: CreateAccountParams<AccountTypeEnum["DELIGATION"]>,
): Extract<Account, { type: AccountTypeEnum["DELIGATION"] }> {
    return Object.freeze({
        ...createCommonAccountPart(data),
        id: createId<AccountId>(),
        type: AccountTypeEnum.DELIGATION,
        delegated_from_account_id: data.delegated_from_account_id,
    });
}

function createCommonAccount(data: CreateAccountParams<CommonAccountType>) {
    return Object.freeze({
        ...createCommonAccountPart(data),
        id: createId<AccountId>(),
        type: data.type,
    });
}

export function createAccount(
    data: CreateAccountParams<AccountType>,
): [
    (
        | ReturnType<typeof createRootAccount>
        | ReturnType<typeof createDelegatedAccount>
        | ReturnType<typeof createCommonAccount>
    ),
    AccountCreatedEvent,
] {
    let account;

    if (data.type === AccountTypeEnum.ROOT) {
        account = createRootAccount(data as CreateAccountParams<AccountTypeEnum["ROOT"]>);
    } else if (data.type === AccountTypeEnum.DELIGATION) {
        account = createDelegatedAccount(data as CreateAccountParams<AccountTypeEnum["DELIGATION"]>);
    } else {
        account = createCommonAccount(data as CreateAccountParams<CommonAccountType>);
    }

    return [account, createAccountCreatedEvent(account.id)];
}
