export const UserStatusEnum = Object.freeze({
    ACTIVE: "active", // Всё в порядке, пользователь может работать
    BLOCKED: "blocked", // Заблокирован модератором, нельзя войти
    DELETED: "deleted", // Помечен как удалённый, остаётся в истории
    BANNED: "banned", // Нарушение правил, доступ закрыт навсегда или на период
    PENDING: "pending", // Зарегистрировался, но ещё не подтвердил почту
    SUSPENDED: "suspended", // Временная заморозка (например, интеграция истекла)
    INVITED: "invited", // Получил приглашение, но не зашёл ещё
} as const);

export type UserStatusEnum = typeof UserStatusEnum;
export type UserStatus = UserStatusEnum[keyof UserStatusEnum];

export const isValidStatus = (status: string): status is UserStatus =>
    Object.values<string>(UserStatusEnum).includes(status);
