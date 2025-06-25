import { createId } from "@domain/shared-kernel";

import type { Session, SessionId } from "./session.ts";

type CreateSessionParams = Omit<Session, "id">;

export function createSession(data: CreateSessionParams): Session {
    // todo: добавить создание события
    // @ts-expect-error todo +
    return Object.freeze({
        id: createId<SessionId>(),
        userId: data.userId,
    });
}
