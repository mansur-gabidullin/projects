import type { Account, AccountType, AccountTypeEnum } from "../account";
import type { AccountStatus } from "../account-status";
import { AccountEventTypeEnum, type AccountStatusChangedEvent } from "../account.event";

export const createAccountStatusChangedEvent = (
    account: Extract<Account, { type: Exclude<AccountType, AccountTypeEnum["ROOT"]> }>,
    previousStatus: AccountStatus,
): AccountStatusChangedEvent => ({
    type: AccountEventTypeEnum.STATUS_CHANGED,
    payload: {
        accountId: account.id,
        status: account.status,
        previousStatus: previousStatus,
        occurredAt: new Date(),
    },
});
