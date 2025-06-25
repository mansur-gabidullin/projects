import type { DiscriminantStringLiteralKey, InferCopy } from "@mansur-gabidullin/lib-types";

type MatchHandlers<T, K extends InferCopy<DiscriminantStringLiteralKey<T>, keyof T>, R> = {
    [V in T[K] & string]: (value: Extract<T, Record<K, V>>) => R;
};

export function match<T, K extends InferCopy<DiscriminantStringLiteralKey<T>, keyof T>, R>(
    value: T,
    discriminant: K,
    handlers: MatchHandlers<T, K, R>,
): R {
    const key = value[discriminant];
    const handler = handlers[key as keyof typeof handlers];

    if (handler) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return handler(value as any);
    }

    throw new Error(`Unhandled case: ${String(key)}`);
}
