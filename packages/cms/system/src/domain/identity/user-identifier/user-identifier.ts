import type { BrandedString } from "@mansur-gabidullin/lib-types";
import { Result } from "@mansur-gabidullin/lib-utils";

import type { UserId } from "@domain/shared-kernel";

import {
    type CannotChangeIdentifierValueError,
    createCannotChangeIdentifierValueError,
} from "./user-identifier.errors";
import { createUserIdentifierValueChangedEvent, type UserIdentifierValueChangedEvent } from "./user-identifier.events";
import type { ExternalIdentityId } from "../external-identity/external-identity";
import { UserTypeEnum } from "../user/user";

export const UserIdentifierTypeEnum = Object.freeze({
    ROOT: UserTypeEnum.ROOT, // no value
    GUEST: UserTypeEnum.GUEST, // no value, временно создаётся User и аккаунт гостя
    SYSTEM: UserTypeEnum.SYSTEM, // value = имя бота, сервиса, скрипта
    INTEGRATION: UserTypeEnum.INTEGRATION, // value = id интегратора
    EXTERNAL: "external", // value = external id
    LOGIN: "login", // value = login
    EMAIL: "email", // value = email
    PHONE: "phone", // value = phone
    ANONYMOUS: "anonymous", // no value, no userId
} as const);

export type UserIdentifierTypeEnum = typeof UserIdentifierTypeEnum;
export type UserIdentifierType = UserIdentifierTypeEnum[keyof UserIdentifierTypeEnum];

declare const _idBrand: unique symbol;
export type UserIdentifierId = BrandedString<typeof _idBrand>;

export const userIdentifierTypesWithoutValue = Object.freeze([
    UserIdentifierTypeEnum.ROOT,
    UserIdentifierTypeEnum.GUEST,
    UserIdentifierTypeEnum.ANONYMOUS,
]);

export type UserIdentifierTypeWithoutValue = (typeof userIdentifierTypesWithoutValue)[number];

export function isTypeWithoutValue(type: UserIdentifierType): type is UserIdentifierTypeWithoutValue {
    return userIdentifierTypesWithoutValue.includes(type as UserIdentifierTypeWithoutValue);
}

export type UserIdentifierTypeWithValue = Exclude<UserIdentifierType, UserIdentifierTypeWithoutValue>;

export type UserIdentifier = {
    id: UserIdentifierId;
    createdAt: Date;
    updatedAt: Date;
} & (
    | {
          type: Exclude<UserIdentifierTypeWithValue, UserIdentifierTypeEnum["EXTERNAL"]>;
          userId: UserId;
          value: string;
      }
    | {
          type: UserIdentifierTypeEnum["EXTERNAL"];
          userId: UserId;
          value: ExternalIdentityId;
      }
    | {
          type: Exclude<UserIdentifierTypeWithoutValue, UserIdentifierTypeEnum["ANONYMOUS"]>;
          userId: UserId;
      }
    | {
          type: UserIdentifierTypeEnum["ANONYMOUS"];
      }
);

export type UserIdentifierWithValue = Extract<UserIdentifier, { type: UserIdentifierTypeWithValue }>;

export function changeUserIdentifierValue<UserIdentifier extends UserIdentifierWithValue>(
    userIdentifier: UserIdentifier,
    newValue: UserIdentifier["value"],
): Result<[UserIdentifierWithValue, UserIdentifierValueChangedEvent], CannotChangeIdentifierValueError> {
    if (isTypeWithoutValue(userIdentifier.type)) {
        return Result.error(createCannotChangeIdentifierValueError(userIdentifier.id));
    }

    return Result.ok([
        {
            ...userIdentifier,
            updatedAt: new Date(),
            value: newValue,
        },
        createUserIdentifierValueChangedEvent(userIdentifier.id, userIdentifier.value),
    ]);
}
