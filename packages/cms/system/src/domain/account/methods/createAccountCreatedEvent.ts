import type { AccountId } from "../account";
import { type AccountCreatedEvent, AccountEventTypeEnum } from "../account.event";

export function createAccountCreatedEvent(accountId: AccountId): AccountCreatedEvent {
    return Object.freeze({
        type: AccountEventTypeEnum.CREATED,
        payload: {
            accountId,
            occurredAt: new Date(),
        },
    });
}
