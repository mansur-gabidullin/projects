import { describe, it, expect } from "vitest";

import { greet } from "./index.ts";

describe("greet", () => {
    it("greets a person by name", () => {
        expect(greet("world")).toBe("Hello, world!");
        expect(greet("Mansur")).toBe("Hello, Mansur!");
    });

    it("handles empty string", () => {
        expect(greet("")).toBe("Hello, !");
    });
});
