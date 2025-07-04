import { Result } from "@mansur-gabidullin/lib-utils";

import type { Session, SessionId } from "../session";

export type SessionRepository = Readonly<{
    getById: (id: SessionId) => Promise<Result<Session, Error>>;
}>;
