# My Pet Project

## Начало работы

- скопируй фалы [example.npmrc](example.npmrc) и [example.env](example.env) в корень проекта,
  убрав префикс `example` (файлы оригиналов удалять или переименовывать нельзя)

## 🧹 Код-стайл и проверка качества

Этот проект использует **ESLint**, **Prettier** и IDE-настройки, чтобы обеспечить единый стиль кода и предотвратить ошибки ещё до коммита.

### 📦 Подключенные конфигурации

| Инструмент | Конфиг                                                                    |
| ---------- | ------------------------------------------------------------------------- |
| ESLint     | [`@mansur-gabidullin/eslint-config`](./packages/config/eslint-config)     |
| Prettier   | [`@mansur-gabidullin/prettier-config`](./packages/config/prettier-config) |

---

### 🧑‍💻 Настройка IDE

#### ✅ Visual Studio Code

Убедись, что установлены следующие расширения:

```jsonc
.vscode/extensions.json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode"
  ]
}
```

Автоформат и ESLint-фиксы работают при сохранении, если включены:

```jsonc
.vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true
  }
}
```

#### 🌀 WebStorm / IntelliJ

Включи автоматическое использование конфигов:

- **Settings → ESLint** → `Automatic`
- **Settings → Prettier** → `Automatic`

> Убедись, что `node_modules` и конфиги (`.eslintrc.сjs`, `prettier.config.mjs`) находятся в проекте и доступны IDE.

---

### 🪝 Git hooks (через lefthook)

Форматирование и линтинг также работают **на уровне git pre-commit хуков**, чтобы никто не закоммитил невалидный код. Это настроено через [`lefthook`](https://github.com/evilmartians/lefthook):

```bash
npm install lefthook --save-dev
```

---

### 💡 Советы

- Не запускай `tsc` вручную, он используется только для типизации
