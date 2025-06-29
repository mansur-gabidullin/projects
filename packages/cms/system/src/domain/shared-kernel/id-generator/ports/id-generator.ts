export type IdGenerator = {
    createId: <Id extends string>() => Id;
};
