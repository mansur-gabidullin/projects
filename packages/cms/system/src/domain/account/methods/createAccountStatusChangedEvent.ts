import type { Account, AccountType, AccountTypeEnum } from "../account";
import type { AccountStatus } from "../account-status";
import { AccountEventTypeEnum, type AccountStatusChangedEvent } from "../account.event";

export function createAccountStatusChangedEvent(
    account: Extract<Account, { type: Exclude<AccountType, AccountTypeEnum["ROOT"]> }>,
    previousStatus: AccountStatus,
): AccountStatusChangedEvent {
    return Object.freeze({
        type: AccountEventTypeEnum.STATUS_CHANGED,
        payload: {
            accountId: account.id,
            status: account.status,
            previousStatus: previousStatus,
            occurredAt: new Date(),
        },
    });
}
