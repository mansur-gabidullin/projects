export type IdGenerator = Readonly<{
    createId: <Id extends string>() => Id;
}>;
