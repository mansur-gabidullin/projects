import type { DistributiveOmit } from "@mansur-gabidullin/lib-types";

import { createId } from "@domain/shared-kernel";

import {
    isTypeWithoutValue,
    UserIdentifierTypeEnum,
    type UserIdentifier,
    type UserIdentifierId,
    type UserIdentifierTypeWithoutValue,
} from "./user-identifier";

type CreateUserIdentifierParams = DistributiveOmit<UserIdentifier, "id">;

function isParamsWithoutValue(params: CreateUserIdentifierParams): params is Extract<
    CreateUserIdentifierParams,
    {
        type: UserIdentifierTypeWithoutValue;
    }
> {
    return isTypeWithoutValue(params.type);
}

export function createUserIdentifier(params: CreateUserIdentifierParams): UserIdentifier {
    // todo: добавить создание события
    if (isParamsWithoutValue(params)) {
        return Object.freeze({
            id: createId<UserIdentifierId>(),
            userId: params.userId,
            type: params.type,
        });
    }

    if (params.type === UserIdentifierTypeEnum.EXTERNAL) {
        return Object.freeze({
            id: createId<UserIdentifierId>(),
            type: params.type,
            userId: params.userId,
            value: params.value,
        });
    }

    return Object.freeze({
        id: createId<UserIdentifierId>(),
        type: params.type,
        userId: params.userId,
        value: params.value,
    });
}
