import type { Profile, ProfileId } from "../profile";
import type { ProfileCreatedEvent } from "../profile.event";
import { createProfileCreatedEvent } from "./createProfileCreatedEvent";

type CreateProfileParams = Omit<Profile, "id" | "createdAt" | "updatedAt">;

export function createProfile(id: ProfileId, params: CreateProfileParams): [Profile, ProfileCreatedEvent] {
    const createdAt = new Date();

    return [
        Object.freeze({
            id,
            userId: params.userId,
            displayName: params.displayName,
            avatarUrl: params.avatarUrl,
            bio: params.bio,
            locale: params.locale,
            timezone: params.timezone,
            location: params.location,
            createdAt,
            updatedAt: createdAt,
        }),
        createProfileCreatedEvent(id),
    ];
}
