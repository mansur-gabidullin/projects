import { type AccountId, AccountTypeEnum, type DelegatedAccount } from "../account";
import type { CreateAccountParams } from "./createAccount";
import { createCommonAccountPart } from "./createCommonAccountPart";

export function createDelegatedAccount(id: AccountId, params: CreateAccountParams<DelegatedAccount>): DelegatedAccount {
    return Object.freeze({
        ...createCommonAccountPart(params),
        id,
        type: AccountTypeEnum.DELIGATION,
        delegated_from_account_id: params.delegated_from_account_id,
    });
}
