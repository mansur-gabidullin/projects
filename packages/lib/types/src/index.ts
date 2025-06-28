export type InferCopy<T, Constraint = unknown> = [T] extends [infer U extends Constraint] ? U : Constraint;

export type Brand<TType, TBrand extends symbol> = TType & {
    readonly [key in TBrand]: never;
};

export type BrandedString<TBrand extends symbol> = Brand<string, TBrand>;

export type BrandedNumber<TBrand extends symbol> = Brand<number, TBrand>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

export type MakePartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnionToIntersection<U> = (U extends any ? (x: U) => any : never) extends (x: infer R) => any ? R : never;

// Последний элемент union
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LastOf<T> = UnionToIntersection<T extends any ? () => T : never> extends () => infer R ? R : never;

// Добавить элемент в tuple
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Push<T extends any[], V> = [...T, V];

// Преобразовать union в tuple (с конца)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnionToTuple<T, R extends any[] = []> = [T] extends [never]
    ? R
    : UnionToTuple<Exclude<T, LastOf<T>>, Push<R, LastOf<T>>>;

// Получить длину
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnionLength<T> = UnionToTuple<T> extends infer R extends any[] ? R["length"] : never;

type StringLiteral = string & {};

export type DiscriminantStringLiteralKey<U> = {
    [K in keyof U]: U extends Record<K, infer V>
        ? V extends StringLiteral
            ? string extends V
                ? never // исключаем общий string
                : K
            : never
        : never;
}[keyof U];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DropFirstArg<Fn> = Fn extends (arg: any, ...rest: infer RestArgs) => infer ReturnType
    ? (...args: RestArgs) => ReturnType
    : never;
