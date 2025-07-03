import type { AccountId } from "../account";
import { AccountErrorTypeEnum, type InvalidAccountStatusError } from "../account.error";

export function createInvalidAccountStatusError(accountId: AccountId, received: unknown): InvalidAccountStatusError {
    return Object.freeze({
        type: AccountErrorTypeEnum.INVALID_STATUS,
        accountId: accountId,
        received,
    });
}
