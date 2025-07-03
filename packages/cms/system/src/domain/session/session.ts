import type { BrandedString } from "@mansur-gabidullin/lib-types";

import type { AccountId } from "../account/account";
import type { UserIdentifierId } from "../identity/user-identifier/user-identifier";
import type { UserId } from "../shared-kernel";

declare const _idBrand: unique symbol;
export type SessionId = BrandedString<typeof _idBrand>;

export type Session = Readonly<{
    id: SessionId;
    userId: UserId | undefined;
    accountId: AccountId | undefined;
    userIdentifierId: UserIdentifierId;
    createdAt: Date;
    updatedAt: Date;
    lastSeenAt: Date;
    expiresAt: Date | null; // null = неограниченная
    revokedAt: Date | null; // если отозвана
    revokedBy: UserId | null; // кто отозвал
    device?: string;
    ip?: string;
    userAgent?: string;
    metadata?: Record<string, unknown>;
}>;
