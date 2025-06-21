# `@mansur-gabidullin/eslint-config`

> 💼 Универсальный, расширяемый и современный ESLint-конфиг для TypeScript, React, Next.js, Prettier и монорепозиториев

---

## 📦 Установка

### 1. Базовые зависимости

```bash
npm install -D \
  eslint \
  prettier \
  eslint-plugin-import \
  eslint-plugin-unused-imports \
  eslint-plugin-prettier \
  eslint-config-prettier \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  @mansur-gabidullin/eslint-config
```

### 2. Дополнительно для React / Next.js

```bash
npm install -D \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  eslint-plugin-jsx-a11y \
  eslint-config-next
```

---

## 🛠 Использование

Создайте файл `.eslintrc.сjs` в корне проекта:

```js
export default {
    extends: ["@mansur-gabidullin/eslint-config"],
};
```

Если вы используете React или Next.js, подключите соответствующий пресет:

### Для React

```js
export default {
    extends: ["@mansur-gabidullin/eslint-config/react"],
};
```

### Для Next.js

```js
export default {
    extends: ["@mansur-gabidullin/eslint-config/next"],
};
```

---

## 💡 Особенности

- 📘 Конфиг на ESM
- 🧠 Поддержка TypeScript (`^5.x`)
- 💅 Интеграция с Prettier
- ⚛️ Поддержка React и Next.js
- 🏗 Подходит для монорепозиториев (TurboRepo, Nx и др.)
- 📦 Совместим с `npm`, `yarn`, `pnpm`

---

## 🧪 Проверка кода

```bash
npx eslint . --ext .ts,.tsx,.js,.jsx
```

---

## 👤 Автор

**[Mansur Gabidullin](https://github.com/mansur-gabidullin)**

---

## 📄 Лицензия

Лицензировано под [MIT License](https://opensource.org/licenses/MIT)
