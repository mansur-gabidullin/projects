import type { DropFirstArg } from "@mansur-gabidullin/lib-types";

import type { Account } from "./account";
import { changeAccountStatus } from "./methods/changeAccountStatus";

type AccountService = {
    changeStatus: DropFirstArg<typeof changeAccountStatus>;
};

export function AccountService(account: Account): AccountService {
    return {
        changeStatus: newStatus => changeAccountStatus(account, newStatus),
    };
}
