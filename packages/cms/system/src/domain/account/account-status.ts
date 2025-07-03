export const AccountStatusEnum = Object.freeze({
    CREATED: "created", // Аккаунт зарегистрирован, но не активирован
    ACTIVE: "active", // Всё в порядке, пользователь может работать
    SUSPENDED: "suspended", // Временная заморозка
    DELETED: "deleted", // Помечен как удалённый, остаётся в истории
} as const);

export type AccountStatusEnum = typeof AccountStatusEnum;
export type AccountStatus = AccountStatusEnum[keyof AccountStatusEnum];
