import type { UserIdentifierId } from "../user-identifier";
import { type UserIdentifierCreatedEvent, UserIdentifierEventTypeEnum } from "../user-identifier.event";

export function createUserIdentifierCreatedEvent(userIdentityId: UserIdentifierId): UserIdentifierCreatedEvent {
    return Object.freeze({
        type: UserIdentifierEventTypeEnum.CREATED,
        payload: {
            userIdentityId,
            occurredAt: new Date(),
        },
    });
}
