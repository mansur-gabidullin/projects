import type { SessionId } from "../session";
import { type SessionCreatedEvent, SessionEventTypeEnum } from "../session.event";

export function createSessionCreatedEvent(sessionId: SessionId): SessionCreatedEvent {
    return Object.freeze({
        type: SessionEventTypeEnum.CREATED,
        payload: {
            sessionId,
            occurredAt: new Date(),
        },
    });
}
