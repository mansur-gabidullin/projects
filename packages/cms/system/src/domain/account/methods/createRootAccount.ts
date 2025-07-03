import { type AccountId, AccountTypeEnum, type RootAccount } from "../account";
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
