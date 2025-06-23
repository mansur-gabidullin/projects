export type InferCopy<T, Constraint = unknown> = [T] extends [infer U extends Constraint] ? U : Constraint;

export type Brand<TType, TBrand extends symbol> = TType & {
    [key in TBrand]: never;
};

export type BrandedString<TBrand extends symbol> = Brand<string, TBrand>;

export type BrandedNumber<TBrand extends symbol> = Brand<number, TBrand>;

// declare const BrandTypeId: unique symbol;
//
// // Create a generic Brand interface using a unique identifier
// interface Brand1<in out ID extends string | symbol> {
//     readonly [BrandTypeId]: {
//         readonly [id in ID]: ID;
//     };
// }
//
// // Define a ProductId type branded with a unique identifier
// type ProductId = number & Brand1<"ProductId">;
//
// // Define a UserId type branded similarly
// type UserId = number & Brand1<"UserId">;
