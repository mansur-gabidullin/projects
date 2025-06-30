import {
    userIdentifierTypesWithoutValue,
    type UserIdentifier,
    type UserIdentifierTypeWithoutValue,
    type UserIdentifierWithValue,
} from "../user-identifier";

export function hasUserIdentifierValue(userIdentifier: UserIdentifier): userIdentifier is UserIdentifierWithValue {
    return !userIdentifierTypesWithoutValue.includes(userIdentifier.type as UserIdentifierTypeWithoutValue);
}
