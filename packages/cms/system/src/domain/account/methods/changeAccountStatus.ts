import { Result } from "@mansur-gabidullin/lib-utils";

import { type Account, AccountTypeEnum } from "../account";
import type { AccountStatus } from "../account-status";
import type { CannotChangeStatusOfRootError, InvalidAccountStatusError } from "../account.error";
import type { AccountStatusChangedEvent } from "../account.event";
import { createAccountStatusChangedEvent } from "./createAccountStatusChangedEvent";
import { createCannotChangeStatusOfRootError } from "./createCannotChangeStatusOfRootError";
import { createInvalidAccountStatusError } from "./createInvalidAccountStatusError";
import { isAccountStatusValid } from "./isAccountStatusValid";

export const changeAccountStatus = (
    account: Account,
    newStatus: AccountStatus,
): Result<[Account, AccountStatusChangedEvent], CannotChangeStatusOfRootError | InvalidAccountStatusError> => {
    if (account.type === AccountTypeEnum.ROOT) {
        return Result.error(createCannotChangeStatusOfRootError());
    }

    if (!isAccountStatusValid(newStatus)) {
        return Result.error(createInvalidAccountStatusError(account.id, newStatus));
    }

    return Result.ok([
        Object.freeze({
            ...account,
            updatedAt: new Date(),
            status: newStatus,
        }),
        createAccountStatusChangedEvent(account, account.status),
    ]);
};
