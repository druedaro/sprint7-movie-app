# Sprint 7 Project# Budget Calculator



Un proyecto React moderno con TypeScript, configurado con las mejores prácticas y tecnologías actuales.A modern React application for creating professional budget estimates for digital marketing and web development projects.



------



## 📚 Tabla de Contenidos## Table of Contents



- [Descripción](#descripción)- [Background](#background)

- [Tecnologías](#tecnologías)- [Features](#features)

- [Estructura del Proyecto](#estructura-del-proyecto)- [Tech Stack](#tech-stack)

- [Configuración Inicial](#configuración-inicial)- [Project Structure](#project-structure)

- [Scripts Disponibles](#scripts-disponibles)- [Getting Started](#getting-started)

- [Testing](#testing)- [Testing](#testing)



------



## 📖 Descripción## Background



Este proyecto está configurado como una base sólida para desarrollo con React + TypeScript, siguiendo el patrón Atomic Design y las mejores prácticas de 2024/2025.This project was born from the need to quickly and reliably generate professional budget estimates for web and marketing services. The main goal is to explore and practice not only React itself, but also related technologies that are essential in modern React development, such as React Router for navigation, React Hook Form for form management, and Zod for schema validation.



**Filosofía del proyecto:**The philosophy behind this app is:



- 🎯 **Código limpio y mantenible**: Estructura organizada y fácil de escalar- **Explore the React ecosystem:** Go beyond the basics of React and get hands-on experience with its most useful libraries and patterns.

- 📦 **Atomic Design**: Componentes organizados en atoms → molecules → organisms- **Deepen understanding of React:** Focus on component architecture, hooks, state management, and best practices for building scalable apps.

- 🔒 **Type Safety**: TypeScript para detectar errores en desarrollo- **Separation of concerns:** All static data, configuration, and types are centralized for easy maintenance.

- 🎨 **Tailwind CSS**: Estilos modernos y responsive- **Developer experience:** The stack and structure are chosen to maximize productivity and code quality.

- ✅ **Testing**: Jest y Testing Library para garantizar calidad

- 🗄️ **Supabase**: Backend como servicio para datos y autenticación---



---## Features



## 🛠️ Tecnologías- ✅ Service selection with dynamic pricing

- ✅ Web development configuration (pages & languages)

- **React 19** - Librería UI con hooks- ✅ Annual payment discount (20% off)

- **TypeScript** - Tipado estático- ✅ Budget creation and management

- **Vite** - Build tool rápido- ✅ Search and sort functionality

- **Tailwind CSS** - Framework CSS utility-first- ✅ URL parameter synchronization

- **React Router** - Navegación entre páginas- ✅ Local storage persistence

- **React Hook Form** - Gestión de formularios- ✅ Responsive design with Tailwind CSS

- **Zod** - Validación de esquemas- ✅ Full TypeScript support

- **Supabase** - Backend as a Service- ✅ Comprehensive testing

- **Jest** - Framework de testing

- **Testing Library** - Testing de componentes React---



---## Tech Stack



## 📁 Estructura del Proyecto- **React 19** with hooks

- **TypeScript** for type safety

```- **Tailwind CSS** for styling

src/- **React Router** for navigation

├── App.tsx                 # Componente raíz con enrutado- **React Hook Form** for form state management

├── main.tsx               # Punto de entrada- **Zod** for schema validation

├── index.css              # Estilos globales- **Jest** for testing

├── components/- **Vite** for build tooling

│   ├── atoms/            # Componentes básicos (Button, Input)

│   ├── molecules/        # Componentes compuestos---

│   ├── organisms/        # Componentes complejos

│   └── utils/           # Componentes utilidad## Project Structure

├── config/

│   └── types.ts         # Tipos TypeScript centralizados```

├── hooks/               # Custom hookssrc/

├── pages/               # Páginas/vistas de la app├── App.tsx

├── utils/               # Funciones utilidad├── components/

│   └── tests/          # Tests de utilidades│   ├── utils/

└── setupTests.ts       # Configuración de tests│   │   └── ScrollToTop.tsx

```│   ├── atoms/

│   │   ├── Button.tsx

---│   │   ├── IconButton.tsx

│   │   ├── Input.tsx

## ⚙️ Configuración Inicial│   │   └── Toggle.tsx

│   ├── molecules/

```bash│   │   ├── FormField.tsx

# Instalar dependencias│   │   ├── HelpModal.tsx

npm install│   │   ├── NumberInput.tsx

│   │   └── SearchBar.tsx

# Iniciar servidor de desarrollo│   └── organisms/

npm run dev│       ├── BudgetForm.tsx

│       ├── BudgetList.tsx

# Compilar para producción│       ├── ServicesList.tsx

npm run build│       └── WebConfigurationPanel.tsx

```├── config/

│   ├── appData.ts

---│   ├── budgetFormValidation.ts

│   └── types.ts

## 📜 Scripts Disponibles├── hooks/

│   ├── useBudgetStorage.ts

- `npm run dev` - Inicia servidor de desarrollo (http://localhost:5173)│   ├── useCalculator.ts

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
