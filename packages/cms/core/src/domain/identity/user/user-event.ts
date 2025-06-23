import type { UserId } from "@shared-kernel";

import { UserStatusEnum } from "./user-status.ts";

export const UserEventTypeEnum = Object.freeze({
    CREATED: "created",
    DELETED: UserStatusEnum.DELETED,
    BANNED: UserStatusEnum.BANNED,
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

export type UserBannedEvent = Readonly<{
    type: UserEventTypeEnum["BANNED"];
    payload: {
        userId: UserId;
        occurredAt: Date;
    };
}>;

export type UserDeletedEvent = Readonly<{
    type: UserEventTypeEnum["DELETED"];
    payload: {
        userId: UserId;
        occurredAt: Date;
    };
}>;

export type UserEvent = UserCreatedEvent | UserBannedEvent | UserDeletedEvent;
