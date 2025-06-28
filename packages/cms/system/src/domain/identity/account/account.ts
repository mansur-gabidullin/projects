import type { BrandedString } from "@mansur-gabidullin/lib-types";
import { Result } from "@mansur-gabidullin/lib-utils";

import type { UserId } from "@domain/shared-kernel";

import { type AccountStatus, isAccountStatusValid } from "./account-status";
import {
    type CannotChangeStatusOfRootError,
    createCannotChangeStatusOfRootError,
    createInvalidAccountStatusError,
    type InvalidAccountStatusError,
} from "./account.errors";
import { type AccountStatusChangedEvent, createAccountStatusChangedEvent } from "./account.events";
import { UserTypeEnum } from "../user/user";
import { UserIdentifierTypeEnum } from "../user-identifier/user-identifier";

export const AccountTypeEnum = Object.freeze({
    ROOT: UserIdentifierTypeEnum.ROOT, // если авторизовался как root, то получи аккаунт root
    GUEST: UserIdentifierTypeEnum.GUEST, // если авторизовался как гость, то получи аккаунт гостя
    SYSTEM: UserIdentifierTypeEnum.SYSTEM, // если авторизовался как бот, скрипт или сервис, то получи аккаунт системы
    INTEGRATION: UserIdentifierTypeEnum.INTEGRATION, // если авторизовался как интегратор, то получи аккаунт интегратора
    DELIGATION: "deligation", // делегированный аккаунт от другого пользователя
    READONLY: "readonly", // только для чтения (например, для аудиторской системы или отчётов)
    BASIC: UserTypeEnum.BASIC, // в остальных случаях получи базовый тип аккаунта
} as const);

export type AccountTypeEnum = typeof AccountTypeEnum;
export type AccountType = AccountTypeEnum[keyof AccountTypeEnum];

declare const _idBrand: unique symbol;
export type AccountId = BrandedString<typeof _idBrand>;

declare const _scopBrand: unique symbol;
export type AccountScope = BrandedString<typeof _scopBrand>;

export type Account = Readonly<
    {
        id: AccountId;
        userId: UserId;
        createdAt: Date;
        updatedAt: Date;
    } & (
        | { type: AccountTypeEnum["ROOT"] }
        | ({
              scope: AccountScope;
              status: AccountStatus;
              expiresAt: Date | null;
          } & (
              | {
                    type: AccountTypeEnum["DELIGATION"];
                    delegated_from_account_id: AccountId;
                }
              | { type: Exclude<AccountType, AccountTypeEnum["ROOT"] | AccountTypeEnum["DELIGATION"]> }
          ))
    )
>;

export const changeAccountStatus = (
    account: Account,
    newStatus: AccountStatus,
): Result<[Account, AccountStatusChangedEvent], CannotChangeStatusOfRootError | InvalidAccountStatusError> => {
    if (account.type === AccountTypeEnum.ROOT) {
        return Result.error(createCannotChangeStatusOfRootError());
    }

    if (!isAccountStatusValid(newStatus)) {
        return Result.error(createInvalidAccountStatusError(account.id, newStatus));
    }

    return Result.ok([
        Object.freeze({
            ...account,
            updatedAt: new Date(),
            status: newStatus,
        }),
        createAccountStatusChangedEvent(account, account.status),
    ]);
};
