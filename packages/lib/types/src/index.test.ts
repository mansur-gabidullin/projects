import type { Equal, Expect, NotEqual, TrueCases } from "type-testing";
import { describe, it, expect } from "vitest";

import type { BrandedNumber, BrandedString, InferCopy, UnionLength } from ".";

describe("greet", () => {
    it("greets", () => {
        expect("Hello, world!").toBe("Hello, world!");
    });
});

type CheckValues<T extends Record<string, string>> = {
    [K in keyof T]: string extends T[K] ? never : T[K];
};

// Можно передать объект содержащий только литеральные строки
type ObjectWithLiterals<T extends CheckValues<InferCopy<T, Record<string, string>>>> = T;

// @ts-expect-error test
type _ObjectWithLiteralsTest = [
    ObjectWithLiterals<{ value: "some literal" }>, // OK
    // @ts-expect-error test
    ObjectWithLiterals<{ value: string }>, // Error
];

declare const _idBrand: unique symbol;
// @ts-expect-error test
type _Id = BrandedString<typeof _idBrand>;

declare const _radiusBrand: unique symbol;
declare const _metersBrand: unique symbol;
type Radius = BrandedNumber<typeof _radiusBrand>;
type Meters = BrandedNumber<typeof _metersBrand>;

const radius = 10 as Radius & Meters;

const metersToKilometers = (_meters: Meters) => {
    /*  */
};

const circleSquare = (_radius: Radius) => {
    /*  */
};

const circleSquareInMeters = (_radius: Radius & Meters) => {
    /*  */
};

metersToKilometers(radius); // Ok
circleSquare(radius); // Ok
circleSquareInMeters(radius); // Ok

declare const idBrandSymbol: unique symbol;
declare const _secondSymbol: unique symbol;

// @ts-expect-error test
type _SymbolsTest = TrueCases<
    [
        // Типы не равны
        NotEqual<typeof idBrandSymbol, typeof _secondSymbol>,
        // Типы равны
        Equal<typeof idBrandSymbol, typeof idBrandSymbol>,
    ]
>;

type Id2 = string & { [idBrandSymbol]: never };

// @ts-expect-error test
type _IdTest = Expect<NotEqual<Id2, string>>;

const process = (id: Id2) => id;

// Ошибка так как '1234' - не Id
// @ts-expect-error test
process("1234");
process("1234" as Id2);

let id!: Id2;
process(id);

type MyUnion = "a" | "b" | "c";
// @ts-expect-error test
type _Count = UnionLength<MyUnion>; // Count = 3 ✅

// Проверка:
// @ts-expect-error test
type _Test = Expect<Equal<UnionLength<MyUnion>, 3>>; // ✅ OK
