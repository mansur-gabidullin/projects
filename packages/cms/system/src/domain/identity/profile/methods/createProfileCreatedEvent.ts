import type { ProfileId } from "../profile";
import { type ProfileCreatedEvent, ProfileEventTypeEnum } from "../profile.event";

export function createProfileCreatedEvent(profileId: ProfileId): ProfileCreatedEvent {
    return Object.freeze({
        type: ProfileEventTypeEnum.CREATED,
        payload: {
            profileId,
            occurredAt: new Date(),
        },
    });
}
