import type { DropFirstArg } from "@mansur-gabidullin/lib-types";

import type { Account } from "./account";
import { changeAccountStatus } from "./methods/changeAccountStatus";

type AccountService = Readonly<{
    changeStatus: DropFirstArg<typeof changeAccountStatus>;
}>;

export function AccountService(account: Account): AccountService {
    return Object.freeze({
        changeStatus: newStatus => changeAccountStatus(account, newStatus),
    });
}
