import type { AccountId } from "./account";

export const AccountErrorTypeEnum = Object.freeze({
    INVALID_STATUS: "InvalidStatus",
    CANNOT_CHANGE_STATUS_OF_ROOT: "CannotChangeStatusOfRoot",
} as const);

export type AccountErrorTypeEnum = typeof AccountErrorTypeEnum;

export type AccountErrorType = AccountErrorTypeEnum[keyof AccountErrorTypeEnum];

export type CannotChangeStatusOfRootError = Readonly<{
    type: AccountErrorTypeEnum["CANNOT_CHANGE_STATUS_OF_ROOT"];
}>;

export type InvalidAccountStatusError = Readonly<{
    type: AccountErrorTypeEnum["INVALID_STATUS"];
    accountId: AccountId;
    received: unknown;
}>;

export type AccountError = InvalidAccountStatusError;
