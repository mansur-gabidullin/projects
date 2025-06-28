import type { UserId } from "@domain/shared-kernel";

export const UserEventTypeEnum = Object.freeze({
    CREATED: "USER_CREATED",
    CHANGED_TO_BASIC: "USER_CHANGED_TO_BASIC",
} as const);

export type UserEventTypeEnum = typeof UserEventTypeEnum;
export type UserEventType = UserEventTypeEnum[keyof UserEventTypeEnum];

export type UserCreatedEvent = Readonly<{
    type: UserEventTypeEnum["CREATED"];
    payload: {
        userId: UserId;
        occurredAt: Date;
    };
}>;

export type UserTypeChangedToBasicEvent = Readonly<{
    type: UserEventTypeEnum["CHANGED_TO_BASIC"];
    payload: {
        userId: UserId;
        occurredAt: Date;
    };
}>;

export function createUserCreatedEvent(userId: UserId): UserCreatedEvent {
    return Object.freeze({
        type: UserEventTypeEnum.CREATED,
        payload: {
            userId,
            occurredAt: new Date(),
        },
    });
}

export function createUserTypeChangedToBasicEvent(userId: UserId): UserTypeChangedToBasicEvent {
    return Object.freeze({
        type: UserEventTypeEnum.CHANGED_TO_BASIC,
        payload: {
            userId,
            occurredAt: new Date(),
        },
    });
}

export type UserEvent = UserCreatedEvent | UserTypeChangedToBasicEvent;
