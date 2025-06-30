import type { UserReference } from "@domain/shared-kernel";

import type { Profile } from "../../profile/profile";
import type { User } from "../user";

export function createUserReference(deps: { user: User; profile: Profile | undefined }): UserReference {
    const { user, profile } = deps;
    const id = user.id;

    if (profile) {
        const { displayName, avatarUrl } = profile;

        return Object.freeze({
            id,
            displayName,
            avatarUrl,
        });
    }

    return Object.freeze({
        id,
    });
}
