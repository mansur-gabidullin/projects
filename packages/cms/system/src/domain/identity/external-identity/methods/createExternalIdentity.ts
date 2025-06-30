import type { ExternalIdentity, ExternalIdentityId } from "../external-identity";
import type { ExternalIdentityCreatedEvent } from "../external-identity.event";
import { createExternalIdentityCreatedEvent } from "./createExternalIdentityCreatedEvent";

type CreateExternalIdentityParams = Omit<ExternalIdentity, "id" | "createdAt" | "updatedAt">;

export function createExternalIdentity(
    id: ExternalIdentityId,
    params: CreateExternalIdentityParams,
): [ExternalIdentity, ExternalIdentityCreatedEvent] {
    const createdAt = new Date();

    return [
        Object.freeze({
            id,
            userId: params.userId,
            externalId: params.externalId,
            provider: params.provider,
            metadata: params.metadata,
            createdAt,
            updatedAt: createdAt,
        }),
        createExternalIdentityCreatedEvent(id),
    ];
}
