# Sprint 7 : Movies App

A modern web application built with **React** and **Vite** that allows users to explore movies using **The Movie Database (TMDb) API** with **Supabase authentication**.

---

## Table of Contents

- [Background](#background)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Testing](#testing)

---

## Background

This project was developed to explore and integrate a modern frontend stack, focusing on building a real-world application that consumes an external API and handles user authentication securely. The main goal is to practice building a full-featured application, from initial setup with Vite to deployment.

The philosophy behind this app is:

- **Explore a modern frontend stack:** Gain hands-on experience with Vite's speed, React's component architecture, and Supabase for a seamless backend-as-a-service experience.
- **Master secure authentication flows:** Implement login, logout, session management, and protected routes using Supabase's powerful and easy-to-use auth tools.
- **Implement robust API integration patterns:** Use Axios to manage HTTP requests, including interceptors for automatically attaching API keys and handling responses efficiently.
- **Focus on developer experience:** The chosen stack and project structure are designed to maximize productivity, maintainability, and code quality.

---

## Features

- ✅ Browse popular and trending movies from TMDb.
- ✅ Secure user authentication (Login/Logout) powered by Supabase.
- ✅ Protected routes to ensure only authenticated users can access content.
- ✅ Clean and reusable component-based architecture.
- ✅ Environment-based configuration for API keys and secrets.
- ✅ Fully responsive design for a great experience on any device.
- ✅ **Test User Available:**
  - **Email:** `guest@account.com`
  - **Password:** `guest1234`

---

## Tech Stack

- **React 19** with Hooks
- **TypeScript** for type safety
- **Vite** for lightning-fast build tooling
- **Tailwind CSS** for modern and responsive styling
- **React Router** for client-side routing and navigation
- **Axios** as the HTTP client for API requests
- **Supabase** for authentication and backend services
- **Jest** for testing

---

## Project Structure
```sh
src/
├── App.tsx
├── main.tsx
├── index.css
│
├── assets/
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── ProtectedRoute.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Input.tsx
│
├── hooks/
│   ├── useAuth.ts
│   └── useMovies.ts
│
├── pages/
│   ├── LoginPage.tsx
│   ├── MoviesPage.tsx
│   └── ProfilePage.tsx
│
├── services/
│   ├── tmdbApi.ts
│   └── supabaseClient.ts
│
└── context/
└── AuthContext.tsx
```

---

## Getting Started

To get a local copy up and running, follow these simple steps.

1.  **Clone the repository**
    ```sh
    git clone [https://github.com/your-username/moviesapp.git](https://github.com/your-username/moviesapp.git)
    cd moviesapp
    ```
2.  **Install dependencies**
    ```sh
    npm install
    ```
3.  **Set up environment variables**

    Create a `.env` file in the root directory and add the following credentials. You can get them from the [TMDb API](https://www.themoviedb.org/documentation/api) and your [Supabase Dashboard](https://supabase.com/dashboard).
    ```env
    VITE_TMDB_API_KEY=your_tmdb_api_key
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```
4.  **Run the development server**
    ```sh
    npm run dev
    ```
    Open your browser and navigate to `http://localhost:5173`.

---

## Testing

The project features a comprehensive testing strategy focused on validating critical application logic.

### Testing Methodology
- **MoSCoW Method**: Business-critical functions are tested using MoSCoW prioritization (Must have, Should have, Could have, Won't have) to ensure the most important parts of the app are reliable.
- **Integration Tests**: Focus on real user scenarios and end-to-end workflow validation, such as the complete login and data fetching process.

### Test Categories
- **Business Logic**: Authentication logic (login/logout), session management, and API data validation.
- **Customer Scenarios**: Real-world usage patterns like user login flows, searching for movies, and navigating protected routes.
- **Component Integration**: Form validation, state management, and user interactions within components.
- **Utility Functions**: Helper functions for data transformations and formatting.

Run tests with `npm test` or `npm run test:watch` for watch mode.

All tests focus on ensuring a secure and reliable user experience, from authentication to data display.
