import type { ExternalIdentityId } from "./external-identity";

export const ExternalIdentityEventTypeEnum = Object.freeze({
    CREATED: "EXTERNAL_IDENTITY_CREATED",
} as const);

export type ExternalIdentityEventTypeEnum = typeof ExternalIdentityEventTypeEnum;
export type ExternalIdentityEventType = ExternalIdentityEventTypeEnum[keyof ExternalIdentityEventTypeEnum];

export type ExternalIdentityCreatedEvent = Readonly<{
    type: ExternalIdentityEventTypeEnum["CREATED"];
    payload: {
        externalIdentityId: ExternalIdentityId;
        occurredAt: Date;
    };
}>;

export type ExternalIdentityEvent = ExternalIdentityCreatedEvent;
