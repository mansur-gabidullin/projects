import { createId, type UserId } from "@shared-kernel";

import { type InvalidStatusError, UserErrorTypeEnum, type UserNotFoundError } from "./user-error.ts";
import type { UserEvent, UserEventType } from "./user-event.ts";
import { UserStatusEnum, type UserStatus } from "./user-status.ts";
import type { User } from "./user.ts";

export const createUserId = (): UserId => createId();

export const createUser = (): User =>
    Object.freeze({
        id: createUserId(),
        status: UserStatusEnum.ACTIVE satisfies UserStatus,
        createdAt: new Date(),
    });

export const createUserEvent = <Type extends UserEventType>(type: Type, userId: UserId): UserEvent => ({
    type,
    payload: {
        userId: userId,
        occurredAt: new Date(),
    },
});

export const createInvalidStatusError = (userId: UserId, status: string): InvalidStatusError => ({
    type: UserErrorTypeEnum.INVALID_STATUS,
    userId,
    status,
});

export const createUserNotFoundError = (userId: string): UserNotFoundError => ({
    type: UserErrorTypeEnum.USER_NOT_FOUND,
    userId,
});
