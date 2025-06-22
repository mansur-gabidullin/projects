# @mansur-gabidullin/config-vitest

> Shared Vitest configuration presets for all `@mansur-gabidullin` monorepo packages.

This package provides reusable Vitest configuration presets with sensible defaults for modern frontend and fullstack TypeScript projects. It supports `jsdom`, TypeScript, and includes an optional variant for passing when no tests are found.

---

## Installation

Make sure you have Vitest, jsdom, and TypeScript installed:

```bash
npm install --save-dev vitest jsdom typescript
```

Then install the config package:

```bash
npm install --save-dev @mansur-gabidullin/config-vitest
```

---

## Usage

In your `vitest.config.ts` or `vitest.config.mjs` file, import one of the presets:

### ✅ Default configuration

```ts
import config from "@mansur-gabidullin/config-vitest";

export default config;
```

### ✅ Allow running with no test files

```ts
import config from "@mansur-gabidullin/config-vitest/pass-no-test";

export default config;
```

This variant enables `passWithNoTests: true`, which prevents Vitest from throwing an error when no test files are found (useful in CI or monorepo setups with optional test packages).

---

## Included Defaults

The shared configuration includes:

| Property          | Value                                                                         |
| ----------------- | ----------------------------------------------------------------------------- |
| `environment`     | `"jsdom"` — simulates browser environment                                     |
| `include`         | `["**/*.{test,spec}.{ts,tsx}"]` — common test file patterns                   |
| `exclude`         | `["node_modules", "dist", "coverage", "**/.{git,cache,output,temp,idea}/**"]` |
| `passWithNoTests` | _Optional preset only_ — enabled in `pass-no-test` variant                    |

---

## Directory Structure (Internal)

```
packages/
└── config/
    └── vitest-config/
        ├── index.cjs               # default config
        ├── pass-no-test.mjs       # config with passWithNoTests
        └── package.json
```

---

## License

See [MIT License](https://opensource.org/licenses/MIT) for details.
