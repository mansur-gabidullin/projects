import type { DistributiveOmit, DropFirstArg } from "@mansur-gabidullin/lib-types";

import {
    isTypeWithoutValue,
    type UserIdentifier,
    type UserIdentifierId,
    UserIdentifierTypeEnum,
    type UserIdentifierTypeWithoutValue,
} from "./user-identifier";
import { createUserIdentifierCreatedEvent, type UserIdentifierCreatedEvent } from "./user-identifier.events";
import type { IdGenerator } from "../../shared-kernel";

type CreateUserIdentifierParams = DistributiveOmit<UserIdentifier, "id" | "createdAt" | "updatedAt">;

function isParamsWithoutValue(params: CreateUserIdentifierParams): params is Extract<
    CreateUserIdentifierParams,
    {
        type: UserIdentifierTypeWithoutValue;
    }
> {
    return isTypeWithoutValue(params.type);
}

function createUserIdentifier(
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

    return [userIdentifier, createUserIdentifierCreatedEvent(userIdentifier.id)];
}

type UserIdentifierFactory = {
    create: DropFirstArg<typeof createUserIdentifier>;
};

export function UserIdentifierFactory(idGenerator: IdGenerator): UserIdentifierFactory {
    const createUserIdentifierId = idGenerator.createId<UserIdentifierId>;

    return {
        create: params => createUserIdentifier(createUserIdentifierId(), params),
    };
}
