import type { Equal, Expect, NotEqual, TrueCases } from "type-testing";

import type { BrandedNumber, BrandedString, InferCopy } from ".";

type CheckValues<T extends Record<string, string>> = {
    [K in keyof T]: string extends T[K] ? never : T[K];
};

// Можно передать объект содержащий только литеральные строки
type ObjectWithLiterals<T extends CheckValues<InferCopy<T, Record<string, string>>>> = T;

// @ts-expect-error test
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ObjectWithLiteralsTest = [
    ObjectWithLiterals<{ value: "some literal" }>, // OK
    // @ts-expect-error test
    ObjectWithLiterals<{ value: string }>, // Error
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const idBrand: unique symbol;
// @ts-expect-error test
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Id = BrandedString<typeof idBrand>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const radiusBrand: unique symbol;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const metersBrand: unique symbol;
type Radius = BrandedNumber<typeof radiusBrand>;
type Meters = BrandedNumber<typeof metersBrand>;

const radius = 10 as Radius & Meters;

// @ts-expect-error test
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const metersToKilometers = (meters: Meters) => {
    /*  */
};

// @ts-expect-error test
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const circleSquare = (radius: Radius) => {
    /*  */
};

// @ts-expect-error test
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const circleSquareInMeters = (radius: Radius & Meters) => {
    /*  */
};

metersToKilometers(radius); // Ok
circleSquare(radius); // Ok
circleSquareInMeters(radius); // Ok

declare const idBrandSymbol: unique symbol;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const secondSymbol: unique symbol;

// @ts-expect-error test
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type SymbolsTest = TrueCases<
    [
        // Типы не равны
        NotEqual<typeof idBrandSymbol, typeof secondSymbol>,
        // Типы равны
        Equal<typeof idBrandSymbol, typeof idBrandSymbol>,
    ]
>;

type Id2 = string & { [idBrandSymbol]: never };

// @ts-expect-error test
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type IdTest = Expect<NotEqual<Id2, string>>;

const process = (id: Id2) => id;

// Ошибка так как '1234' - не Id
// @ts-expect-error test
process("1234");
process("1234" as Id2);

let id!: Id2;
process(id);
