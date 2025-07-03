import type { DropFirstArg } from "@mansur-gabidullin/lib-types";

import type { Session } from "./session";

declare const toDo: (session: Session) => void;

type SessionService = Readonly<{
    toDo: DropFirstArg<typeof toDo>;
}>;

export function SessionService(session: Session): SessionService {
    return Object.freeze({
        toDo: () => toDo(session),
    });
}
