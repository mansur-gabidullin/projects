import type { UserId } from "./user-id";

export type UserReference = Readonly<{
    id: UserId;
    displayName?: string;
    avatarUrl?: string;
}>;
