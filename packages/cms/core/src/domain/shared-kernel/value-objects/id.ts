import { v4 as uuidV4 } from "uuid";

export function createId<Id extends string>(): Id {
    return uuidV4() as Id;
}
