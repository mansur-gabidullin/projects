# @mansur-gabidullin/typescript-config

> Shared TypeScript configuration presets for all `@mansur-gabidullin` monorepo packages.

This package provides reusable `tsconfig.json` base configs tailored for different environments such as Node.js, React, libraries, tests, and type declarations.

---

## Installation

Make sure you have TypeScript installed:

```bash
npm install --save-dev typescript
```

Then install the config package:

```bash
npm install --save-dev @mansur-gabidullin/typescript-config
```

---

## Usage

In your package `tsconfig.json`, extend one of the provided presets:

### ✅ For Node.js projects:

```json
{
    "extends": "@mansur-gabidullin/typescript-config/node.json"
}
```

### ✅ For React projects:

```json
{
    "extends": "@mansur-gabidullin/typescript-config/react.json"
}
```

### ✅ For type declarations (`*.d.ts` only):

```json
{
    "extends": "@mansur-gabidullin/typescript-config/types.json"
}
```

### ✅ For test environments (e.g. Vitest, Jest):

```json
{
    "extends": "@mansur-gabidullin/typescript-config/test.json"
}
```

### ✅ Base (shared minimal config):

```json
{
    "extends": "@mansur-gabidullin/typescript-config/base.json"
}
```

You can also override or extend settings per project as needed.

---

## Included Configs

| Config File  | Description                        |
| ------------ | ---------------------------------- |
| `base.json`  | Common defaults, used as base      |
| `node.json`  | For Node.js (CJS/ESM) environments |
| `react.json` | For React apps/libraries           |
| `types.json` | For declaration-only projects      |
| `test.json`  | For unit/integration test configs  |

---

## License

See [MIT License](https://opensource.org/licenses/MIT) for details.
