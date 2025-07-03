import type { UserId } from "../identity";

export type ProfileReference = Readonly<{
    userId: UserId;
    displayName?: string;
    avatarUrl?: string;
}>;
