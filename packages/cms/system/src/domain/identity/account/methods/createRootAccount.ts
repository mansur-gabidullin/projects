import { type AccountId, AccountTypeEnum } from "../account";
import type { RootAccount } from "../account.factory";
import type { CreateAccountParams } from "./createAccount";

export function createRootAccount(id: AccountId, params: CreateAccountParams<RootAccount>): RootAccount {
    const createdAt = new Date();

    return Object.freeze({
        id,
        type: AccountTypeEnum.ROOT,
        userId: params.userId,
        createdAt,
        updatedAt: createdAt,
    });
}
