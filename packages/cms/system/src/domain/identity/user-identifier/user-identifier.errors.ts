import type { UserIdentifierId } from "./user-identifier";

export const UserIdentifierErrorTypeEnum = Object.freeze({
    CANNOT_CHANGE_VALUE: "CannotChangeIdentifierValueError",
} as const);

export type UserIdentifierErrorTypeEnum = typeof UserIdentifierErrorTypeEnum;
export type UserIdentifierErrorType = UserIdentifierErrorTypeEnum[keyof UserIdentifierErrorTypeEnum];

export type CannotChangeIdentifierValueError = {
    type: UserIdentifierErrorTypeEnum["CANNOT_CHANGE_VALUE"];
    userIdentifierId: UserIdentifierId;
};

export type UserIdentifierError = CannotChangeIdentifierValueError;

export function createCannotChangeIdentifierValueError(
    userIdentifierId: UserIdentifierId,
): CannotChangeIdentifierValueError {
    return {
        type: UserIdentifierErrorTypeEnum.CANNOT_CHANGE_VALUE,
        userIdentifierId,
    };
}
