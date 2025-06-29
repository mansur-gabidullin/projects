import type { DropFirstArg } from "@mansur-gabidullin/lib-types";

import type { IdGenerator } from "@domain/shared-kernel";

import type { Profile, ProfileId } from "./profile";
import { createProfileCreatedEvent, type ProfileCreatedEvent } from "./profile.events";

type CreateProfileParams = Omit<Profile, "id" | "createdAt" | "updatedAt">;

function createProfile(id: ProfileId, params: CreateProfileParams): [Profile, ProfileCreatedEvent] {
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

type ProfileFactory = {
    create: DropFirstArg<typeof createProfile>;
};

export function ProfileFactory(idGenerator: IdGenerator): ProfileFactory {
    const createProfileId = idGenerator.createId<ProfileId>;

    return {
        create: params => createProfile(createProfileId(), params),
    };
}
