import type { BrandedString } from "@mansur-gabidullin/lib-types";

import type { UserId } from "@domain/shared-kernel";

import type { AccountId } from "../account/account";

declare const _idBrand: unique symbol;
export type SessionId = BrandedString<typeof _idBrand>;

export type Session = Readonly<{
    id: SessionId;
    userId: UserId;
    accountId: AccountId;
    createdAt: Date;
    lastSeenAt: Date;
    expiresAt: Date | null; // null = неограниченная
    revokedAt?: Date; // если отозвана
    revokedBy?: UserId; // кто отозвал
    device?: string;
    ip?: string;
    userAgent?: string;
    metadata?: Record<string, unknown>;
}>;
