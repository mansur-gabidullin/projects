import type { BrandedString } from "@mansur-gabidullin/lib-types";

declare const _idBrand: unique symbol;
export type UserId = BrandedString<typeof _idBrand>;
