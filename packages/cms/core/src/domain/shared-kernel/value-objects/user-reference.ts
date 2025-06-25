import type { UserId } from "./user-id.ts";

export type UserReference = Readonly<{
    id: UserId;
    displayName?: string;
    avatarUrl?: string;
}>;
