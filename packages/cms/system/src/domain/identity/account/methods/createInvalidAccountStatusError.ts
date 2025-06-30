import type { AccountId } from "../account";
import { AccountErrorTypeEnum, type InvalidAccountStatusError } from "../account.error";

export const createInvalidAccountStatusError = (
    accountId: AccountId,
    received: unknown,
): InvalidAccountStatusError => ({
    type: AccountErrorTypeEnum.INVALID_STATUS,
    accountId: accountId,
    received,
});
