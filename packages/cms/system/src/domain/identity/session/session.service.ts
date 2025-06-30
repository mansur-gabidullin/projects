import type { DropFirstArg } from "@mansur-gabidullin/lib-types";

import type { Session } from "./session";

declare const toDo: (session: Session) => void;

type SessionService = {
    toDo: DropFirstArg<typeof toDo>;
};

export function SessionService(session: Session): SessionService {
    return {
        toDo: () => toDo(session),
    };
}
