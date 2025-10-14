# Sprint 7 Project - Budget Calculator# Sprint 7 Project - Budget Calculator



A modern React application to consume a Star Wars API. It fetches and displays a list of starships, with a separate detail view available for each item. The main goal is to demonstrate skills in handling asynchronous data from an external API and rendering it effectively in a user interface.



------



## 📚 Table of Contents## 📚 Table of Contents



- [Background](#background)- [Background](#background)

- [Features](#features)- [Features](#features)

- [Tech Stack](#tech-stack)- [Tech Stack](#tech-stack)

- [Project Structure](#project-structure)- [Project Structure](#project-structure)

- [Getting Started](#getting-started)- [Getting Started](#getting-started)

- [Testing](#testing)- [Testing](#testing)



---



## 📖 Background---



This project was born from the need to quickly and reliably generate professional budget estimates for web and marketing services. The main goal is to explore and practice not only React itself, but also related technologies that are essential in modern React development, such as React Router for navigation, React Hook Form for form management, and Zod for schema validation.## 📖 Background



The philosophy behind this app is:This project was born from the need to quickly and reliably generate professional budget estimates for web and marketing services. The main goal is to explore and practice not only React itself, but also related technologies that are essential in modern React development, such as React Router for navigation, React Hook Form for form management, and Zod for schema validation.



- **Explore the React ecosystem:** Go beyond the basics of React and get hands-on experience with its most useful libraries and patterns.The philosophy behind this app is:

- **Deepen understanding of React:** Focus on component architecture, hooks, state management, and best practices for building scalable apps.

- **Separation of concerns:** All static data, configuration, and types are centralized for easy maintenance.- **Explore the React ecosystem:** Go beyond the basics of React and get hands-on experience with its most useful libraries and patterns.

- **Developer experience:** The stack and structure are chosen to maximize productivity and code quality.- **Deepen understanding of React:** Focus on component architecture, hooks, state management, and best practices for building scalable apps.

- **Separation of concerns:** All static data, configuration, and types are centralized for easy maintenance.

---- **Developer experience:** The stack and structure are chosen to maximize productivity and code quality.



## Features



- ✅ Service selection with dynamic pricing---## Features

- ✅ Web development configuration (pages & languages)

- ✅ Annual payment discount (20% off)

- ✅ Budget creation and management

- ✅ Search and sort functionality## 🛠️ Tecnologías- ✅ Service selection with dynamic pricing

- ✅ URL parameter synchronization

- ✅ Local storage persistence- ✅ Web development configuration (pages & languages)

- ✅ Responsive design with Tailwind CSS

- ✅ Full TypeScript support- **React 19** - Librería UI con hooks- ✅ Annual payment discount (20% off)

- ✅ Comprehensive testing

- **TypeScript** - Tipado estático- ✅ Budget creation and management

---

- **Vite** - Build tool rápido- ✅ Search and sort functionality

## Tech Stack

- **Tailwind CSS** - Framework CSS utility-first- ✅ URL parameter synchronization

- **React 19** with hooks

- **TypeScript** for type safety- **React Router** - Navegación entre páginas- ✅ Local storage persistence

- **Tailwind CSS** for styling

- **React Router** for navigation- **React Hook Form** - Gestión de formularios- ✅ Responsive design with Tailwind CSS

- **React Hook Form** for form state management

- **Zod** for schema validation- **Zod** - Validación de esquemas- ✅ Full TypeScript support

- **Jest** for testing

- **Vite** for build tooling- **Supabase** - Backend as a Service- ✅ Comprehensive testing



---- **Jest** - Framework de testing



## Project Structure- **Testing Library** - Testing de componentes React---



```

src/

├── App.tsx---## Tech Stack

├── components/

│   ├── utils/

│   │   └── ScrollToTop.tsx

│   ├── atoms/## 📁 Estructura del Proyecto- **React 19** with hooks

│   │   ├── Button.tsx

│   │   ├── IconButton.tsx- **TypeScript** for type safety

│   │   ├── Input.tsx

│   │   └── Toggle.tsx```- **Tailwind CSS** for styling

│   ├── molecules/

│   │   ├── FormField.tsxsrc/- **React Router** for navigation

│   │   ├── HelpModal.tsx

│   │   ├── NumberInput.tsx├── App.tsx                 # Componente raíz con enrutado- **React Hook Form** for form state management

│   │   └── SearchBar.tsx

│   └── organisms/├── main.tsx               # Punto de entrada- **Zod** for schema validation

│       ├── BudgetForm.tsx

│       ├── BudgetList.tsx├── index.css              # Estilos globales- **Jest** for testing

│       ├── ServicesList.tsx

│       └── WebConfigurationPanel.tsx├── components/- **Vite** for build tooling

├── config/

│   ├── appData.ts│   ├── atoms/            # Componentes básicos (Button, Input)

│   ├── budgetFormValidation.ts

│   └── types.ts│   ├── molecules/        # Componentes compuestos---

├── hooks/

│   ├── useBudgetStorage.ts│   ├── organisms/        # Componentes complejos

│   ├── useCalculator.ts

│   └── useUrlSync.ts│   └── utils/           # Componentes utilidad## Project Structure

│

├── index.css├── config/

├── main.tsx

├── pages/│   └── types.ts         # Tipos TypeScript centralizados```

│   ├── CalculatorPage.tsx

│   └── WelcomePage.tsx├── hooks/               # Custom hookssrc/

├── setupTests.ts

└── utils/├── pages/               # Páginas/vistas de la app├── App.tsx

    ├── budgetUtils.ts

    └── tests/├── utils/               # Funciones utilidad├── components/

        ├── budgetUtils.integration.test.ts

        └── budgetUtils.moscow.test.ts│   └── tests/          # Tests de utilidades│   ├── utils/

```

└── setupTests.ts       # Configuración de tests│   │   └── ScrollToTop.tsx

---

```│   ├── atoms/

## Getting Started

│   │   ├── Button.tsx

```bash

# Install dependencies---│   │   ├── IconButton.tsx

npm install

│   │   ├── Input.tsx

# Start development server

npm run dev## ⚙️ Configuración Inicial│   │   └── Toggle.tsx



# Build for production│   ├── molecules/

npm run build

``````bash│   │   ├── FormField.tsx



### Available Scripts# Instalar dependencias│   │   ├── HelpModal.tsx



- `npm run dev` - Start development server (http://localhost:5173)npm install│   │   ├── NumberInput.tsx

- `npm run build` - Build for production

- `npm run preview` - Preview production build│   │   └── SearchBar.tsx

- `npm run lint` - Run ESLint

- `npm test` - Run tests# Iniciar servidor de desarrollo│   └── organisms/

- `npm run test:watch` - Run tests in watch mode

npm run dev│       ├── BudgetForm.tsx

---

│       ├── BudgetList.tsx

## Testing

# Compilar para producción│       ├── ServicesList.tsx

The project features a comprehensive testing strategy focused on business logic validation:

npm run build│       └── WebConfigurationPanel.tsx

### Testing Methodology

- **MoSCoW Method**: Business-critical functions are tested using MoSCoW prioritization (Must have, Should have, Could have, Won't have)```├── config/

- **Integration Tests**: Real customer scenarios and end-to-end workflow validation

│   ├── appData.ts

### Test Categories

- **Business Logic**: Budget calculations, pricing algorithms, currency formatting---│   ├── budgetFormValidation.ts

- **Customer Scenarios**: Real-world usage patterns and edge cases

- **Component Integration**: Form validation, state management, user interactions│   └── types.ts

- **Utility Functions**: Helper functions and data transformations

## 📜 Scripts Disponibles├── hooks/

Run tests with `npm test` or `npm run test:watch` for watch mode.

│   ├── useBudgetStorage.ts

All tests focus on protecting revenue-critical calculations and ensuring reliable customer experience.

- `npm run dev` - Inicia servidor de desarrollo (http://localhost:5173)│   ├── useCalculator.ts

---
- `npm run build` - Compila para producción│   └── useUrlSync.ts

- `npm run preview` - Preview de la build de producción│

- `npm run lint` - Ejecuta ESLint├── index.css

- `npm test` - Ejecuta tests├── main.tsx

- `npm run test:watch` - Tests en modo watch├── pages/

│   ├── CalculatorPage.tsx

---│   └── WelcomePage.tsx

├── setupTests.ts

## ✅ Testing└── utils/

    ├── budgetUtils.ts

El proyecto incluye configuración completa de testing con Jest y Testing Library.    └── tests/

        ├── budgetUtils.integration.test.ts

### Estrategia de Testing        └── budgetUtils.moscow.test.ts

```

- **MoSCoW Method**: Priorización de casos de prueba

- **Integration Tests**: Validación de flujos completos---

- **Unit Tests**: Testing de funciones y lógica

## Getting Started

### Ejecutar Tests

```bash

```bash# Install dependencies

# Ejecutar todos los testsnpm install

npm test

# Start development server

# Modo watch (re-ejecuta al guardar)npm run dev

npm run test:watch

```# Run tests

npm test

---

# Build for production

## 🗄️ Supabasenpm run build

```

El proyecto está configurado para usar Supabase como backend. Configuración necesaria:

---

1. Crear cuenta en [supabase.com](https://supabase.com)

2. Crear un nuevo proyecto## Testing

3. Configurar variables de entorno (archivo `.env.local`):

The project features a comprehensive testing strategy focused on business logic validation:

```env

VITE_SUPABASE_URL=tu_url_de_supabase### Testing Methodology

VITE_SUPABASE_ANON_KEY=tu_anon_key- **MoSCoW Method**: Business-critical functions are tested using MoSCoW prioritization (Must have, Should have, Could have, Won't have)

```- **Integration Tests**: Real customer scenarios and end-to-end workflow validation



---### Test Categories

- **Business Logic**: Budget calculations, pricing algorithms, currency formatting

**Nivel del proyecto**: Beginner/Intermediate- **Customer Scenarios**: Real-world usage patterns and edge cases

**Comentarios**: En español para facilitar comprensión- **Component Integration**: Form validation, state management, user interactions

- **Utility Functions**: Helper functions and data transformations

Run tests with `npm test` or `npm run test:watch` for watch mode.

All tests focus on protecting revenue-critical calculations and ensuring reliable customer experience.

---
