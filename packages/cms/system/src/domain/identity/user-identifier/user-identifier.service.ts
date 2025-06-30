import type { DropFirstArg } from "@mansur-gabidullin/lib-types";

import { changeUserIdentifierValue } from "./methods/changeUserIdentifierValue";
import { hasUserIdentifierValue } from "./methods/hasUserIdentifierValue";
import type { UserIdentifier } from "./user-identifier";

type UserIdentifierService = Readonly<{
    hasValue: DropFirstArg<typeof hasUserIdentifierValue>;
    changeValue: DropFirstArg<typeof changeUserIdentifierValue>;
}>;

export function UserIdentifierService(userIdentifier: UserIdentifier): UserIdentifierService {
    return Object.freeze({
        hasValue: () => hasUserIdentifierValue(userIdentifier),
        changeValue: newValue => changeUserIdentifierValue(userIdentifier, newValue),
    });
}
