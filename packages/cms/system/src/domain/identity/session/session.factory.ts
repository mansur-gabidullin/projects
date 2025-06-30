import type { DropFirstArg } from "@mansur-gabidullin/lib-types";

import type { IdGenerator } from "@domain/shared-kernel";

import { createSession } from "./methods/createSession";
import type { SessionId } from "./session";

type SessionFactory = {
    create: DropFirstArg<typeof createSession>;
};

export function SessionFactory(idGenerator: IdGenerator): SessionFactory {
    const createSessionId = idGenerator.createId<SessionId>;

    return {
        create: params => createSession(createSessionId(), params),
    };
}
