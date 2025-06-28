import type { DropFirstArg } from "@mansur-gabidullin/lib-types";

import type { ExternalIdentity, ExternalIdentityId } from "./external-identity";
import { createExternalIdentityCreatedEvent, type ExternalIdentityCreatedEvent } from "./external-identity.events";
import type { IdGenerator } from "../../shared-kernel";

type CreateExternalIdentityParams = Omit<ExternalIdentity, "id" | "createdAt" | "updatedAt">;

function createExternalIdentity(
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

type ExternalIdentityFactory = {
    create: DropFirstArg<typeof createExternalIdentity>;
};

export function ExternalIdentityFactory(idGenerator: IdGenerator): ExternalIdentityFactory {
    const createExternalIdentityId = idGenerator.createId<ExternalIdentityId>;

    return {
        create: params => createExternalIdentity(createExternalIdentityId(), params),
    };
}
