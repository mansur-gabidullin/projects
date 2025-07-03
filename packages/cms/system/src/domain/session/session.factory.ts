import type { DropFirstArg } from "@mansur-gabidullin/lib-types";

import type { IdGenerator } from "../shared-kernel";
import { createSession } from "./methods/createSession";
import type { SessionId } from "./session";

type SessionFactory = Readonly<{
    create: DropFirstArg<typeof createSession>;
}>;

export function SessionFactory(idGenerator: IdGenerator): SessionFactory {
    const createSessionId = idGenerator.createId<SessionId>;

    return Object.freeze({
        create: params => createSession(createSessionId(), params),
    });
}
