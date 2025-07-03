import { type AccountStatus, AccountStatusEnum } from "../account-status";

export const isAccountStatusValid = (status: string): status is AccountStatus =>
    Object.values<string>(AccountStatusEnum).includes(status);
