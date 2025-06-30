import type { UserId } from "@domain/shared-kernel";

import { UserErrorTypeEnum, type UserIsNotGuestError } from "../user.error";

export function createUserIsNotGuestError(userId: UserId): UserIsNotGuestError {
    return {
        type: UserErrorTypeEnum.USER_IS_NOT_GUEST,
        userId,
    };
}
