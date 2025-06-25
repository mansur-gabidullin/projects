import type { BrandedString } from "@mansur-gabidullin/lib-types";

import type { UserId } from "@domain/shared-kernel";

import type { ExternalIdentityId } from "../external-identity/external-identity.ts";
import { UserTypeEnum } from "../user/user.ts";

export const UserIdentifierTypeEnum = Object.freeze({
    ROOT: UserTypeEnum.ROOT, // no value
    GUEST: UserTypeEnum.GUEST, // no value, временно создаётся User и аккаунт гостя
    SYSTEM: UserTypeEnum.SYSTEM, // value = имя бота, сервиса, скрипта
    INTEGRATION: UserTypeEnum.INTEGRATION, // value = id интегратора
    EXTERNAL: "external", // value = external id
    LOGIN: "login", // value = login
    EMAIL: "email", // value = email
    PHONE: "phone", // value = phone
} as const);

export type UserIdentifierTypeEnum = typeof UserIdentifierTypeEnum;

export type UserIdentifierType = UserIdentifierTypeEnum[keyof UserIdentifierTypeEnum];

declare const _idBrand: unique symbol;
export type UserIdentifierId = BrandedString<typeof _idBrand>;

export const userIdentifierTypesWithoutValue = Object.freeze([
    UserIdentifierTypeEnum.ROOT,
    UserIdentifierTypeEnum.GUEST,
]);

export type UserIdentifierTypeWithoutValue = (typeof userIdentifierTypesWithoutValue)[number];

export function isTypeWithoutValue(type: UserIdentifierType): type is UserIdentifierTypeWithoutValue {
    return userIdentifierTypesWithoutValue.includes(type as UserIdentifierTypeWithoutValue);
}

export type UserIdentifierTypeWithValue = Exclude<UserIdentifierType, UserIdentifierTypeWithoutValue>;

export type UserIdentifier = Readonly<
    {
        id: UserIdentifierId;
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
              type: UserIdentifierTypeWithoutValue;
              userId: UserId;
          }
    )
>;
