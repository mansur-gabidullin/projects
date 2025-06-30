import type { SessionId } from "./session";

export const SessionEventTypeEnum = Object.freeze({
    CREATED: "SESSION_CREATED",
} as const);

export type SessionEventTypeEnum = typeof SessionEventTypeEnum;
export type SessionEventType = SessionEventTypeEnum[keyof SessionEventTypeEnum];

export type SessionCreatedEvent = Readonly<{
    type: SessionEventTypeEnum["CREATED"];
    payload: {
        sessionId: SessionId;
        occurredAt: Date;
    };
}>;

export type SessionEvent = SessionCreatedEvent;
