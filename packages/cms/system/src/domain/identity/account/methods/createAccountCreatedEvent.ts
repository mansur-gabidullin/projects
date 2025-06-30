import type { AccountId } from "../account";
import { type AccountCreatedEvent, AccountEventTypeEnum } from "../account.event";

export const createAccountCreatedEvent = (accountId: AccountId): AccountCreatedEvent => ({
    type: AccountEventTypeEnum.CREATED,
    payload: {
        accountId,
        occurredAt: new Date(),
    },
});
