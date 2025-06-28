import type { ProfileId } from "./profile";

export const ProfileEventTypeEnum = Object.freeze({
    CREATED: "PROFILE_CREATED",
} as const);

export type ProfileEventTypeEnum = typeof ProfileEventTypeEnum;
export type ProfileEventType = ProfileEventTypeEnum[keyof ProfileEventTypeEnum];

export type ProfileCreatedEvent = Readonly<{
    type: ProfileEventTypeEnum["CREATED"];
    payload: {
        profileId: ProfileId;
        occurredAt: Date;
    };
}>;

export function createProfileCreatedEvent(profileId: ProfileId): ProfileCreatedEvent {
    return Object.freeze({
        type: ProfileEventTypeEnum.CREATED,
        payload: {
            profileId,
            occurredAt: new Date(),
        },
    });
}

export type ProfileEvent = ProfileCreatedEvent;
