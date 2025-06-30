import type { Result } from "@mansur-gabidullin/lib-utils";

import type { ExternalIdentity, ExternalIdentityId } from "../external-identity";

export type ExternalIdentityRepository = Readonly<{
    getById: (id: ExternalIdentityId) => Promise<Result<ExternalIdentity, Error>>;
}>;
