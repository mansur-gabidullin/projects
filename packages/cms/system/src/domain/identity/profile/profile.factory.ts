import type { DropFirstArg } from "@mansur-gabidullin/lib-types";

import type { IdGenerator } from "@domain/shared-kernel";

import { createProfile } from "./methods/createProfile";
import type { ProfileId } from "./profile";

type ProfileFactory = {
    create: DropFirstArg<typeof createProfile>;
};

export function ProfileFactory(idGenerator: IdGenerator): ProfileFactory {
    const createProfileId = idGenerator.createId<ProfileId>;

    return {
        create: params => createProfile(createProfileId(), params),
    };
}
