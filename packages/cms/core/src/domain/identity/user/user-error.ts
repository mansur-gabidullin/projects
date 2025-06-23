import type { UserId } from "@shared-kernel";

export const UserErrorTypeEnum = Object.freeze({
    INVALID_STATUS: "InvalidStatus",
    USER_NOT_FOUND: "UserNotFound",
} as const);

export type UserErrorTypeEnum = typeof UserErrorTypeEnum;

export type UserErrorType = UserErrorTypeEnum[keyof UserErrorTypeEnum];

export type InvalidStatusError = {
    type: UserErrorTypeEnum["INVALID_STATUS"];
    userId: UserId;
    status: string;
};

export type UserNotFoundError = { type: UserErrorTypeEnum["USER_NOT_FOUND"]; userId: UserId };

export type UserError = InvalidStatusError | UserNotFoundError;
