import type { UserId } from "@domain/shared-kernel";

import { UserEventTypeEnum, type UserTypeChangedToBasicEvent } from "../user.event";

export function createUserTypeChangedToBasicEvent(userId: UserId): UserTypeChangedToBasicEvent {
    return Object.freeze({
        type: UserEventTypeEnum.CHANGED_TO_BASIC,
        payload: {
            userId,
            occurredAt: new Date(),
        },
    });
}
