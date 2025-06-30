import type { DropFirstArg } from "@mansur-gabidullin/lib-types";

import type { IdGenerator } from "@domain/shared-kernel";

import type { ExternalIdentityId } from "./external-identity";
import { createExternalIdentity } from "./methods/createExternalIdentity";

type ExternalIdentityFactory = {
    create: DropFirstArg<typeof createExternalIdentity>;
};

export function ExternalIdentityFactory(idGenerator: IdGenerator): ExternalIdentityFactory {
    const createExternalIdentityId = idGenerator.createId<ExternalIdentityId>;

    return {
        create: params => createExternalIdentity(createExternalIdentityId(), params),
    };
}
