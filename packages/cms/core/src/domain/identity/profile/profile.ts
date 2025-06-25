import type { BrandedString } from "@mansur-gabidullin/lib-types";

import type { UserId } from "@domain/shared-kernel";

declare const _idBrand: unique symbol;
export type ProfileId = BrandedString<typeof _idBrand>;

export type Profile = Readonly<{
    id: ProfileId;
    userId: UserId;
    displayName?: string;
    avatarUrl?: string;
    bio?: string;
    locale?: string;
    timezone?: string;
    location?: string;
}>;
