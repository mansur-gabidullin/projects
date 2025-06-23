import { createId, type UserId } from "@shared-kernel";

export function createUserIdentifier(userId: UserId) {
    return Object.freeze({
        id: createId(),
        userId,
    });
}
