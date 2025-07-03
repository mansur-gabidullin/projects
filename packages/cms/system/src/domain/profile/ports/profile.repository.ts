import { Result } from "@mansur-gabidullin/lib-utils";

import type { UserId } from "../../shared-kernel";
import type { Profile } from "../profile";

export type ProfileRepository = Readonly<{
    getByUserId: (id: UserId) => Promise<Result<Profile, Error>>;
}>;
