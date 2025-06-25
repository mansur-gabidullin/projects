import { createId } from "@domain/shared-kernel";

import type { ExternalIdentity, ExternalIdentityId } from "./external-identity.ts";

type CreateExternalIdentityParams = Omit<ExternalIdentity, "id">;

export function createExternalIdentity(data: CreateExternalIdentityParams): ExternalIdentity {
    return Object.freeze({
        id: createId<ExternalIdentityId>(),
        userId: data.userId,
        externalId: data.externalId,
        provider: data.provider,
        metadata: data.metadata,
    });
}
