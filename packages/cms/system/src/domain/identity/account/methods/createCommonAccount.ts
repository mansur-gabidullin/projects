import type { AccountId } from "../account";
import type { CommonAccount } from "../account.factory";
import type { CreateAccountParams } from "./createAccount";
import { createCommonAccountPart } from "./createCommonAccountPart";

export function createCommonAccount(id: AccountId, params: CreateAccountParams<CommonAccount>): CommonAccount {
    return Object.freeze({
        ...createCommonAccountPart(params),
        id,
        type: params.type,
    });
}
