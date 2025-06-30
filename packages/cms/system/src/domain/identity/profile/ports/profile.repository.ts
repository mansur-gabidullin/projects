import { Result } from "@mansur-gabidullin/lib-utils";

import type { UserId } from "@domain/shared-kernel";

import type { Profile } from "../profile";

export type ProfileRepository = {
    getByUserId: (id: UserId) => Promise<Result<Profile, Error>>;
};
