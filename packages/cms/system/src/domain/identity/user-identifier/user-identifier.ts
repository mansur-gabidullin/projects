import type { BrandedString } from "@mansur-gabidullin/lib-types";

import type { UserId } from "@domain/shared-kernel";

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

export type UserIdentifierTypeWithValue = Exclude<UserIdentifierType, UserIdentifierTypeWithoutValue>;

export type UserIdentifierWithValue = Extract<UserIdentifier, { type: UserIdentifierTypeWithValue }>;

export type ExternalUserIdentifier = Extract<UserIdentifier, { type: UserIdentifierTypeEnum["EXTERNAL"] }>;

export type UserIdentifier = Readonly<
    {
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
    )
>;
