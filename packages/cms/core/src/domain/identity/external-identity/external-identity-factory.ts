import { createId } from "@domain/shared-kernel";

import { createExternalIdentityCreatedEvent, type ExternalIdentityCreatedEvent } from "./external-identity-event.ts";
import type { ExternalIdentity, ExternalIdentityId } from "./external-identity.ts";

type CreateExternalIdentityParams = Omit<ExternalIdentity, "id" | "createdAt" | "updatedAt">;

export function createExternalIdentity(
    data: CreateExternalIdentityParams,
): [ExternalIdentity, ExternalIdentityCreatedEvent] {
    const id = createId<ExternalIdentityId>();
    const createdAt = new Date();

    return [
        Object.freeze({
            id,
            userId: data.userId,
            externalId: data.externalId,
            provider: data.provider,
            metadata: data.metadata,
            createdAt,
            updatedAt: createdAt,
        }),
        createExternalIdentityCreatedEvent(id),
    ];
}
