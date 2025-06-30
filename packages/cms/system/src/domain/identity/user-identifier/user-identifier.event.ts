import type { UserIdentifierId, UserIdentifierWithValue } from "./user-identifier";

export const UserIdentifierEventTypeEnum = Object.freeze({
    CREATED: "UserIdentifierCreatedEvent",
    VALUE_CHANGED: "UserIdentifierValueChangedEvent",
} as const);

export type UserIdentifierEventTypeEnum = typeof UserIdentifierEventTypeEnum;
export type UserIdentifierEventType = UserIdentifierEventTypeEnum[keyof UserIdentifierEventTypeEnum];

export type UserIdentifierCreatedEvent = Readonly<{
    type: UserIdentifierEventTypeEnum["CREATED"];
    payload: {
        userIdentityId: UserIdentifierId;
        occurredAt: Date;
    };
}>;

export type UserIdentifierValueChangedEvent = Readonly<{
    type: UserIdentifierEventTypeEnum["VALUE_CHANGED"];
    payload: {
        userIdentityId: UserIdentifierId;
        previousValue: UserIdentifierWithValue["value"];
        occurredAt: Date;
    };
}>;

export type UserIdentifierEvent = UserIdentifierCreatedEvent | UserIdentifierValueChangedEvent;
