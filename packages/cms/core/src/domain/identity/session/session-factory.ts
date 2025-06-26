import type { MakePartial } from "@mansur-gabidullin/lib-types";

import { createId } from "@domain/shared-kernel";

import { createSessionCreatedEvent, type SessionCreatedEvent } from "./session-event.ts";
import type { Session, SessionId } from "./session.ts";

type CreateSessionParams = MakePartial<
    Omit<Session, "id" | "createdAt" | "updatedAt" | "lastSeenAt">,
    "expiresAt" | "revokedAt" | "revokedBy"
>;

export function createSession(params: CreateSessionParams): [Session, SessionCreatedEvent] {
    const id = createId<SessionId>();
    const createdAt = new Date();

    return [
        Object.freeze({
            id,
            userId: params.userId,
            accountId: params.accountId,
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
