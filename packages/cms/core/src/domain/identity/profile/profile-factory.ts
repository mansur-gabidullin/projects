import { createId } from "@domain/shared-kernel";

import { createProfileCreatedEvent, type ProfileCreatedEvent } from "./profile-event.ts";
import type { Profile, ProfileId } from "./profile.ts";

type CreateProfileParams = Omit<Profile, "id" | "createdAt" | "updatedAt">;

export function createProfile(data: CreateProfileParams): [Profile, ProfileCreatedEvent] {
    const id = createId<ProfileId>();
    const createdAt = new Date();

    return [
        Object.freeze({
            id,
            userId: data.userId,
            displayName: data.displayName,
            avatarUrl: data.avatarUrl,
            bio: data.bio,
            locale: data.locale,
            timezone: data.timezone,
            location: data.location,
            createdAt,
            updatedAt: createdAt,
        }),
        createProfileCreatedEvent(id),
    ];
}
