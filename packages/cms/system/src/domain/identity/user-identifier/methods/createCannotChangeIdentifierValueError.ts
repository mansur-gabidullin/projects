import type { UserIdentifierId } from "../user-identifier";
import { type CannotChangeIdentifierValueError, UserIdentifierErrorTypeEnum } from "../user-identifier.error";

export function createCannotChangeIdentifierValueError(
    userIdentifierId: UserIdentifierId,
): CannotChangeIdentifierValueError {
    return {
        type: UserIdentifierErrorTypeEnum.CANNOT_CHANGE_VALUE,
        userIdentifierId,
    };
}
