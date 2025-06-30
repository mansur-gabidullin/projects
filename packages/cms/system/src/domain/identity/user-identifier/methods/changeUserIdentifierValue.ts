import { Result } from "@mansur-gabidullin/lib-utils";

import {
    UserIdentifierTypeEnum,
    type ExternalUserIdentifier,
    type UserIdentifier,
    type UserIdentifierWithValue,
} from "../user-identifier";
import type { CannotChangeIdentifierValueError } from "../user-identifier.error";
import type { UserIdentifierValueChangedEvent } from "../user-identifier.event";
import { createCannotChangeIdentifierValueError } from "./createCannotChangeIdentifierValueError";
import { createUserIdentifierValueChangedEvent } from "./createUserIdentifierValueChangedEvent";
import { hasUserIdentifierValue } from "./hasUserIdentifierValue";

export function changeUserIdentifierValue(
    userIdentifier: UserIdentifier,
    newValue: UserIdentifierWithValue["value"],
): Result<[UserIdentifierWithValue, UserIdentifierValueChangedEvent], CannotChangeIdentifierValueError> {
    if (!hasUserIdentifierValue(userIdentifier)) {
        return Result.error(createCannotChangeIdentifierValueError(userIdentifier.id));
    }

    let newUserIdentifier;

    if (userIdentifier.type === UserIdentifierTypeEnum.EXTERNAL) {
        newUserIdentifier = {
            ...userIdentifier,
            updatedAt: new Date(),
            value: newValue as ExternalUserIdentifier["value"],
        };
    } else {
        newUserIdentifier = {
            ...userIdentifier,
            updatedAt: new Date(),
            value: newValue as Exclude<UserIdentifierWithValue["value"], ExternalUserIdentifier["value"]>,
        };
    }

    return Result.ok([
        Object.freeze(newUserIdentifier),
        createUserIdentifierValueChangedEvent(userIdentifier.id, userIdentifier.value),
    ]);
}
