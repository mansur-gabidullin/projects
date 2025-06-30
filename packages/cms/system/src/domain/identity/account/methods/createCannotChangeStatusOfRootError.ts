import { AccountErrorTypeEnum, type CannotChangeStatusOfRootError } from "../account.error";

export const createCannotChangeStatusOfRootError = (): CannotChangeStatusOfRootError => ({
    type: AccountErrorTypeEnum.CANNOT_CHANGE_STATUS_OF_ROOT,
});
