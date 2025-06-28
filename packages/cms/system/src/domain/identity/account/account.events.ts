import type { Account, AccountId, AccountType, AccountTypeEnum } from "./account";
import type { AccountStatus } from "./account-status";

export const AccountEventTypeEnum = Object.freeze({
    CREATED: "AccountCreated",
    DELETED: "AccountDeleted",
    SUSPENDED: "AccountSuspended",
    STATUS_CHANGED: "AccountStatusChanged",
} as const);

export type AccountEventTypeEnum = typeof AccountEventTypeEnum;

export type AccountEventType = AccountEventTypeEnum[keyof AccountEventTypeEnum];

export type AccountCreatedEvent = Readonly<{
    type: AccountEventTypeEnum["CREATED"];
    payload: {
        accountId: AccountId;
        occurredAt: Date;
    };
}>;

export type AccountSuspendedEvent = Readonly<{
    type: AccountEventTypeEnum["SUSPENDED"];
    payload: {
        accountId: AccountId;
        occurredAt: Date;
    };
}>;

export type AccountDeletedEvent = Readonly<{
    type: AccountEventTypeEnum["DELETED"];
    payload: {
        accountId: AccountId;
        occurredAt: Date;
    };
}>;

export type AccountStatusChangedEvent = Readonly<{
    type: AccountEventTypeEnum["STATUS_CHANGED"];
    payload: {
        accountId: AccountId;
        status: AccountStatus;
        previousStatus: AccountStatus;
        occurredAt: Date;
    };
}>;

export type AccountEvent =
    | AccountCreatedEvent
    | AccountSuspendedEvent
    | AccountDeletedEvent
    | AccountStatusChangedEvent;

export const createAccountCreatedEvent = (accountId: AccountId): AccountCreatedEvent => ({
    type: AccountEventTypeEnum.CREATED,
    payload: {
        accountId,
        occurredAt: new Date(),
    },
});

export const createAccountStatusChangedEvent = (
    account: Extract<Account, { type: Exclude<AccountType, AccountTypeEnum["ROOT"]> }>,
    previousStatus: AccountStatus,
): AccountStatusChangedEvent => ({
    type: AccountEventTypeEnum.STATUS_CHANGED,
    payload: {
        accountId: account.id,
        status: account.status,
        previousStatus: previousStatus,
        occurredAt: new Date(),
    },
});
