import type { Account, CommonAccount } from "../account";
import type { CreateAccountParams } from "./createAccount";

export function createCommonAccountPart(
    params: Omit<CreateAccountParams<CommonAccount>, "type">,
): Omit<CreateAccountParams<CommonAccount>, "type"> & Pick<Account, "createdAt" | "updatedAt"> {
    const createdAt = new Date();

    return {
        userId: params.userId,
        status: params.status,
        scope: params.scope,
        expiresAt: params.expiresAt,
        createdAt,
        updatedAt: createdAt,
    };
}
