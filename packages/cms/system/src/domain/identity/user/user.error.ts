import type { UserId } from "@domain/shared-kernel";

export const UserErrorTypeEnum = Object.freeze({
    USER_IS_NOT_GUEST: "userIsNotGuestError",
} as const);

export type UserErrorTypeEnum = typeof UserErrorTypeEnum;
export type UserErrorType = UserErrorTypeEnum[keyof UserErrorTypeEnum];

export type UserIsNotGuestError = Readonly<{
    type: UserErrorTypeEnum["USER_IS_NOT_GUEST"];
    userId: UserId;
}>;

export type UserError = UserIsNotGuestError;
