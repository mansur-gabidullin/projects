# @mansur-gabidullin/prettier-config

> Opinionated, shareable Prettier configuration for all @mansur-gabidullin projects.

## ✨ Features

- Prettier 3+ compatible
- Consistent formatting across JavaScript / TypeScript / JSON / React projects

## 📦 Installation

```bash
npm install -D prettier @mansur-gabidullin/prettier-config prettier-plugin-packagejson
```

## 🔧 Usage

In your **`package.json`**:

```json
{
    "prettier": "@mansur-gabidullin/prettier-config"
}
```

For React-specific formatting:

```json
{
    "prettier": "@mansur-gabidullin/prettier-config/react"
}
```

Or in a `.prettierrc` file:

```json
"@mansur-gabidullin/prettier-config"
```

## 🧪 Example

To format your project:

```bash
npx prettier --write .
```

To check formatting:

```bash
npx prettier --check .
```

## 💡 Tips

- Make sure your editor uses Prettier and respects project-level config.
- Use [Lefthook](https://github.com/evilmartians/lefthook) to automate formatting in pre-commit.

## 📁 Included Rules

Some key settings:

| Option           | Value |
| ---------------- | ----- |
| `printWidth`     | 120   |
| `tabWidth`       | 4     |
| `semi`           | true  |
| `singleQuote`    | false |
| `trailingComma`  | all   |
| `arrowParens`    | avoid |
| `bracketSpacing` | true  |
| `endOfLine`      | lf    |

---

## 📝 License

See [MIT License](https://opensource.org/licenses/MIT) for details.
