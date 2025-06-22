# My Pet Project

## 🚀 Начало работы

1. Скопируй файлы [`example.npmrc`](example.npmrc) и [`example.env`](example.env) в корень проекта:
    - Переименуй их, убрав префикс `example`
    - **Не удаляй и не переименовывай оригиналы**

---

## 🧹 Стиль кода и качество

Проект использует **ESLint**, **Prettier** и Git-хуки через [`lefthook`](https://github.com/evilmartians/lefthook) для единых стандартов кода и автопроверок до коммита.

### 📦 Конфигурации

| Инструмент | Конфигурация                                                         |
| ---------- | -------------------------------------------------------------------- |
| ESLint     | [`@mansur-gabidullin/config-eslint`](packages/config/eslint)         |
| Prettier   | [`@mansur-gabidullin/config-prettier`](packages/config/prettier)     |
| Typescript | [`@mansur-gabidullin/config-typescript`](packages/config/typescript) |
| Vitest     | [`@mansur-gabidullin/config-vitest`](packages/config/vitest)         |

---

### 🧑‍💻 Настройка IDE

#### VS Code

Убедись, что установлены расширения:

```jsonc
// .vscode/extensions.json
{
    "recommendations": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"],
}
```

Включи автофиксы при сохранении:

```jsonc
// .vscode/settings.json
{
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll": true,
        "source.fixAll.eslint": true,
    },
}
```

---

### 🔧 Git-хуки

`lefthook` запускает линтер, форматтер и проверки типов при коммите и пуше

---

## 💡 Полезно знать

- Не запускай `tsc` вручную — он используется для типизации через `lefthook`
- Настройки CI и форматтеров работают автоматически — просто пиши код и сохраняй 🎯

---

### 💬 Генерация сообщений коммита

В проекте доступен интерактивный помощник для генерации сообщений коммита в формате [Conventional Commits](https://www.conventionalcommits.org/):

```bash
npm run gen-commit
```

Скрипт запустит CLI-помощник, где можно выбрать тип изменения, область (scope), и кратко описать коммит. После выбора результат будет автоматически скопирован в буфер обмена 💡

> Это особенно удобно, если ты хочешь вручную вставить сообщение при `git commit`.

Файл скрипта: [`scripts/gen-commit/index.mjs`](./scripts/gen-commit/index.mjs)
