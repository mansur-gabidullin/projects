import type { ExternalIdentityId } from "../external-identity";
import { type ExternalIdentityCreatedEvent, ExternalIdentityEventTypeEnum } from "../external-identity.event";

export function createExternalIdentityCreatedEvent(
    externalIdentityId: ExternalIdentityId,
): ExternalIdentityCreatedEvent {
    return Object.freeze({
        type: ExternalIdentityEventTypeEnum.CREATED,
        payload: {
            externalIdentityId,
            occurredAt: new Date(),
        },
    });
}
