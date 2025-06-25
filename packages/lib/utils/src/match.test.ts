// match.test.ts
import { describe, it, expect } from "vitest";

import { match } from "./match";

type Event =
    | { type: "click"; key: string; x: number; y: number }
    | { type: "keypress"; key: string }
    | { type: "scroll"; key: string; deltaY: number };

describe("match function", () => {
    it("handles click event", () => {
        const event = { type: "click", x: 100, y: 200 } as Event;
        const result = match(event, "type", {
            click: ({ x, y }) => `Clicked at (${x}, ${y})`,
            keypress: ({ key }) => `Key pressed: ${key}`,
            scroll: ({ deltaY }) => `Scrolled: ${deltaY}`,
        });
        expect(result).toBe("Clicked at (100, 200)");
    });

    it("handles keypress event", () => {
        const event = { type: "keypress", key: "Enter" } as Event;
        const result = match(event, "type", {
            click: ({ x, y }) => `Clicked at (${x}, ${y})`,
            keypress: ({ key }) => `Key pressed: ${key}`,
            scroll: ({ deltaY }) => `Scrolled: ${deltaY}`,
        });
        expect(result).toBe("Key pressed: Enter");
    });

    it("handles scroll event", () => {
        const event = { type: "scroll", deltaY: 30 } as Event;
        const result = match(event, "type", {
            click: ({ x, y }) => `Clicked at (${x}, ${y})`,
            keypress: ({ key }) => `Key pressed: ${key}`,
            scroll: ({ deltaY }) => `Scrolled: ${deltaY}`,
        });
        expect(result).toBe("Scrolled: 30");
    });
});
