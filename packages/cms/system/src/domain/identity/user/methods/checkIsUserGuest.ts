import { type Guest, type User, UserTypeEnum } from "../user";

export function checkIsUserGuest(user: User): user is Guest {
    return user.type === UserTypeEnum.GUEST;
}
