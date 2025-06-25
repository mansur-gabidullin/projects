import { createId } from "@domain/shared-kernel";

import type { Profile, ProfileId } from "./profile.ts";

type CreateProfileParams = Omit<Profile, "id">;

export function createProfile(data: CreateProfileParams): Profile {
    return Object.freeze({
        id: createId<ProfileId>(),
        userId: data.userId,
        displayName: data.displayName,
        avatarUrl: data.avatarUrl,
        bio: data.bio,
        locale: data.locale,
        timezone: data.timezone,
        location: data.location,
    });
}
