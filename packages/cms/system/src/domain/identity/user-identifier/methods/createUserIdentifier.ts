import type { DistributiveOmit } from "@mansur-gabidullin/lib-types";

import {
    type UserIdentifier,
    type UserIdentifierId,
    type UserIdentifierTypeWithoutValue,
    UserIdentifierTypeEnum,
    userIdentifierTypesWithoutValue,
} from "../user-identifier";
import type { UserIdentifierCreatedEvent } from "../user-identifier.event";
import { createUserIdentifierCreatedEvent } from "./createUserIdentifierCreatedEvent";

export type CreateUserIdentifierParams = DistributiveOmit<UserIdentifier, "id" | "createdAt" | "updatedAt">;

function isParamsWithoutValue(params: CreateUserIdentifierParams): params is Extract<
    CreateUserIdentifierParams,
    {
        type: UserIdentifierTypeWithoutValue;
    }
> {
    return userIdentifierTypesWithoutValue.includes(params.type as UserIdentifierTypeWithoutValue);
}

export function createUserIdentifier(
    id: UserIdentifierId,
    params: CreateUserIdentifierParams,
): [UserIdentifier, UserIdentifierCreatedEvent] {
    const createdAt = new Date();

    const common = {
        id,
        createdAt,
        updatedAt: createdAt,
    };

    let userIdentifier;

    if (isParamsWithoutValue(params)) {
        if (params.type === UserIdentifierTypeEnum.ANONYMOUS) {
            userIdentifier = {
                ...common,
                type: params.type,
            };
        } else {
            userIdentifier = {
                ...common,
                type: params.type,
                userId: params.userId,
            };
        }
    } else if (params.type === UserIdentifierTypeEnum.EXTERNAL) {
        userIdentifier = {
            ...common,
            type: params.type,
            userId: params.userId,
            value: params.value,
        };
    } else {
        userIdentifier = {
            ...common,
            type: params.type,
            userId: params.userId,
            value: params.value,
        };
    }

    return [Object.freeze(userIdentifier), createUserIdentifierCreatedEvent(userIdentifier.id)];
}
