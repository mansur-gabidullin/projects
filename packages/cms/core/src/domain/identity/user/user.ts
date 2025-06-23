import { Result } from "@mansur-gabidullin/lib-utils";

import type { UserId } from "@shared-kernel";

import { type InvalidStatusError } from "./user-error.ts";
import { type UserEvent, UserEventTypeEnum } from "./user-event.ts";
import { createInvalidStatusError, createUserEvent } from "./user-factory.ts";
import { isValidStatus, type UserStatus } from "./user-status.ts";

export type User = Readonly<{
    id: UserId;
    status: UserStatus;
    createdAt: Date;
}>;

export const changeUserStatus = (
    user: User,
    newStatus: UserStatus,
): Result<[User, UserEvent[]], InvalidStatusError> => {
    if (!isValidStatus(newStatus)) {
        return Result.error(createInvalidStatusError(user.id, newStatus));
    }

    return Result.ok([
        Object.freeze({
            ...user,
            status: newStatus,
        }),
        [createUserEvent(UserEventTypeEnum.CREATED, user.id)],
    ]);
};
