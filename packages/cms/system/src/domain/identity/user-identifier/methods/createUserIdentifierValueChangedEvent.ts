import type { UserIdentifierId, UserIdentifierWithValue } from "../user-identifier";
import { UserIdentifierEventTypeEnum, type UserIdentifierValueChangedEvent } from "../user-identifier.event";

export function createUserIdentifierValueChangedEvent(
    userIdentityId: UserIdentifierId,
    previousValue: UserIdentifierWithValue["value"],
): UserIdentifierValueChangedEvent {
    return Object.freeze({
        type: UserIdentifierEventTypeEnum.VALUE_CHANGED,
        payload: {
            userIdentityId,
            previousValue,
            occurredAt: new Date(),
        },
    });
}
