# @mansur-gabidullin/config-vite

Reusable [Vite](https://vitejs.dev/) configuration for use within a Turborepo-based monorepo.

## 📦 Features

- Shared Vite config for internal packages
- Supports React via `@vitejs/plugin-react`
- Easily extendable per package
- TypeScript-first
- Compatible with `vite.config.mjs` in consuming packages

---

## 📁 Installation

Inside your Turborepo project:

```bash
# If using local workspaces (recommended):
pnpm install @mansur-gabidullin/config-vite -w

# Or if published externally:
npm install @mansur-gabidullin/config-vite
```

---

## 🛠️ Usage

In your package (e.g. `packages/lib-utils/vite.config.mjs`):

```ts
import baseConfig from "@mansur-gabidullin/config-vite";
import { mergeConfig, defineConfig } from "vite";

export default mergeConfig(
    baseConfig,
    defineConfig({
        // Custom overrides for this package
        build: {
            outDir: "dist",
        },
    }),
);
```

---

## 📁 File structure

```bash
packages/
  config-vite/
    index.ts           # Entry point, exports shared config
    vite.base.mjs       # Base Vite config definition
    tsconfig.json
    package.json
    dist/              # Built JS files go here (after `tsc`)
```

---

## ⚙️ Build

To transpile the TypeScript config into usable JS:

```bash
cd packages/config-vite
pnpm build
```

This outputs to `dist/`, which is then used by other packages in the monorepo.

---

## 🧩 Turbo Integration

Add the config package as a dependency in other internal packages (in their `package.json`):

```json
"dependencies": {
  "@mansur-gabidullin/config-vite": "*"
}
```

And ensure `turbo.json` includes proper pipeline setup:

```json
{
    "pipeline": {
        "build": {
            "dependsOn": ["^build"],
            "outputs": ["dist/**"]
        }
    }
}
```

---

## 🧪 Testing Locally

If not yet published to a registry, you can use a `pnpm` workspace alias or relative import via `tsconfig.paths`.

---

## License

See [MIT License](https://opensource.org/licenses/MIT) for details.
