import type { UserId } from "./user-id.ts";

export type UserReference = Readonly<{
    id: UserId;
}>;

type CreateUserReferenceData = {
    id: UserId;
};

export const createUserReference = (data: CreateUserReferenceData): UserReference =>
    Object.freeze({
        id: data.id,
    });
