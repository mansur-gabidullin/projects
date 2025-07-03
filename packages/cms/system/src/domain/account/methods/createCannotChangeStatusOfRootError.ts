import { AccountErrorTypeEnum, type CannotChangeStatusOfRootError } from "../account.error";

export function createCannotChangeStatusOfRootError(): CannotChangeStatusOfRootError {
    return Object.freeze({
        type: AccountErrorTypeEnum.CANNOT_CHANGE_STATUS_OF_ROOT,
    });
}
