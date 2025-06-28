import type { BrandedString } from "@mansur-gabidullin/lib-types";

import type { UserId } from "@domain/shared-kernel";

declare const _idBrand: unique symbol;
export type ExternalIdentityId = BrandedString<typeof _idBrand>;

declare const _providerNameBrand: unique symbol;
export type ExternalIdentityProviderName = BrandedString<typeof _providerNameBrand>;

export type ExternalIdentity = Readonly<{
    id: ExternalIdentityId;
    userId: UserId;
    provider: ExternalIdentityProviderName;
    externalId: unknown;
    metadata?: Record<string, unknown>;
    createdAt: Date;
    updatedAt: Date;
}>;
