import { v4 as createId } from "uuid";

import type { IdGenerator } from "@domain/shared-kernel";

export function UUIDGeneratorFactory(): IdGenerator {
    return {
        createId,
    };
}
