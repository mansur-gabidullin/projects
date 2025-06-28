import type { UserId } from "@domain/shared-kernel";

export const UserTypeEnum = Object.freeze({
    // Привилегированный пользователь, может быть только один, создаётся по-умолчанию
    ROOT: "root",

    // Не человек, системный пользователь: бот, скрипт, сервис
    SYSTEM: "system",

    // Не человек, интеграция со сторонней системой
    INTEGRATION: "integration",

    // Обычный пользователь, человек, сохранён в БД
    BASIC: "basic",

    // Временный пользователь, человек, но без UserIdentifier, но имеет аккаунт гостя, не сохраняется в БД
    // не путать с anonymous, у anonymous есть сессия, но нет аккаунта
    // гость может получить на время какие-то временные доступы, создаётся по секретной одноразовой ссылке,
    // по которой на время ему будут выданы определённые права и для этого будет создан User
    GUEST: "guest",
} as const);

export type UserTypeEnum = typeof UserTypeEnum;
export type UserType = UserTypeEnum[keyof UserTypeEnum];

export type User = Readonly<{
    id: UserId;
    type: UserType;
    createdAt: Date;
    updatedAt: Date;
}>;

export type Guest = User & { type: UserTypeEnum["GUEST"] };
