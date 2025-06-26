import type { DistributiveOmit } from "@mansur-gabidullin/lib-types";

import { createId } from "@domain/shared-kernel";

import {
    isTypeWithoutValue,
    type UserIdentifier,
    type UserIdentifierId,
    UserIdentifierTypeEnum,
    type UserIdentifierTypeWithoutValue,
} from "./user-identifier";
import { createUserIdentifierCreatedEvent, type UserIdentifierCreatedEvent } from "./user-identity-event.ts";

type CreateUserIdentifierParams = DistributiveOmit<UserIdentifier, "id" | "createdAt" | "updatedAt">;

function isParamsWithoutValue(params: CreateUserIdentifierParams): params is Extract<
    CreateUserIdentifierParams,
    {
        type: UserIdentifierTypeWithoutValue;
    }
> {
    return isTypeWithoutValue(params.type);
}

export function createUserIdentifier(params: CreateUserIdentifierParams): [UserIdentifier, UserIdentifierCreatedEvent] {
    const createdAt = new Date();

    const common = {
        id: createId<UserIdentifierId>(),
        createdAt,
        updatedAt: createdAt,
    };

    let userIdentifier;

    if (isParamsWithoutValue(params)) {
        userIdentifier = {
            ...common,
            type: params.type,
            userId: params.userId,
        };
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

    return [userIdentifier, createUserIdentifierCreatedEvent(userIdentifier.id)];
}
