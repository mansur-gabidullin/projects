import type { UserId } from "@domain/shared-kernel";

import { type UserCreatedEvent, UserEventTypeEnum } from "../user.event";

export function createUserCreatedEvent(userId: UserId): UserCreatedEvent {
    return Object.freeze({
        type: UserEventTypeEnum.CREATED,
        payload: {
            userId,
            occurredAt: new Date(),
        },
    });
}
