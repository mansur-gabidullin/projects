export type Result<T, E> = Ok<T> | Err<E>;

export type Ok<T> = { ok: true; value: T };
export type Err<E> = { ok: false; error: E };

export const Result = {
    ok: <T>(value: T): Ok<T> => ({ ok: true, value }),
    error: <E>(error: E): Err<E> => ({ ok: false, error }),

    isOk: <T, E>(r: Result<T, E>): r is Ok<T> => r.ok,
    isError: <T, E>(r: Result<T, E>): r is Err<E> => !r.ok,

    map: <T, E, U>(r: Result<T, E>, fn: (val: T) => U): Result<U, E> => (r.ok ? Result.ok(fn(r.value)) : r),

    mapErr: <T, E, F>(r: Result<T, E>, fn: (error: E) => F): Result<T, F> => (r.ok ? r : Result.error(fn(r.error))),

    andThen: <T, E, U>(r: Result<T, E>, fn: (val: T) => Result<U, E>): Result<U, E> => (r.ok ? fn(r.value) : r),

    match: <T, E, R>(r: Result<T, E>, handlers: { ok: (val: T) => R; error: (error: E) => R }): R =>
        r.ok ? handlers.ok(r.value) : handlers.error(r.error),

    getOrElse: <T, E>(r: Result<T, E>, fallback: (error: E) => T): T => (r.ok ? r.value : fallback(r.error)),

    toPromise: <T, E>(r: Result<T, E>): Promise<T> => (r.ok ? Promise.resolve(r.value) : Promise.reject(r.error)),
};
