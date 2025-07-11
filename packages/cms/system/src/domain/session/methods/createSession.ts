import type { MakePartial } from "@mansur-gabidullin/lib-types";

import type { Session, SessionId } from "../session";
import type { SessionCreatedEvent } from "../session.event";
import { createSessionCreatedEvent } from "./createSessionCreatedEvent";

type CreateSessionParams = MakePartial<
    Omit<Session, "id" | "createdAt" | "updatedAt" | "lastSeenAt">,
    "expiresAt" | "revokedAt" | "revokedBy"
>;

export function createSession(id: SessionId, params: CreateSessionParams): [Session, SessionCreatedEvent] {
    const createdAt = new Date();

    return [
        Object.freeze({
            id,
            userId: params.userId,
            accountId: params.accountId,
            userIdentifierId: params.userIdentifierId,
            device: params.device,
            ip: params.ip,
            userAgent: params.userAgent,
            metadata: params.metadata,
            expiresAt: params.expiresAt ?? null,
            revokedAt: params.revokedAt ?? null,
            revokedBy: params.revokedBy ?? null,
            createdAt: createdAt,
            lastSeenAt: createdAt,
            updatedAt: createdAt,
        }),
        createSessionCreatedEvent(id),
    ];
}
