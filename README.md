# 🎬 MovieApp - Movies & Series Explorer

A modern and optimized web application for exploring movies and series using **React 19**, **TypeScript**, **Vite**, and **TMDB API** with secure authentication via **Supabase**.

---

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech-Stack](#tech-stack)
- [Installation](#installation)
- [Available-Scripts](#available-scripts)
- [Testing](#testing)
- [Project-Structure](#project-structure)
- [Best-Practices](#best-practices)
- [Deployment](#deployment)

---

## Description

**MovieApp** is a modern movie content exploration application that integrates:

- ✅ **React 19** with TypeScript in strict mode
- ✅ **Native Fetch API** (no external HTTP dependencies)
- ✅ **Supabase** for authentication
- ✅ **TMDB API** for movie/series data
- ✅ **Tailwind CSS** for responsive design
- ✅ **Vitest** for automated testing

### Project Philosophy

1. **Clean Code:** Clean, documented, and maintainable code
2. **Performance First:** Optimized for production (405 KB bundle)
3. **Zero Over-engineering:** Only necessary dependencies
4. **Type Safety:** TypeScript strict mode
5. **Modern Standards:** Fetch API, ESM, Vite

---

## Features

### 🔐 Authentication
- ✅ Login/Register with Supabase
- ✅ Protected routes
- ✅ Persistent session
- ✅ Automatic redirection
- ✅ React Hook Form + Zod validation
- ✅ Real-time form validation

### 🎬 Content Exploration
- ✅ Popular movies catalog
- ✅ Popular series catalog
- ✅ Complete details (synopsis, cast, videos)
- ✅ Actor information and filmography
- ✅ Embedded YouTube trailers

### 🔍 Search & Filters
- ✅ Real-time search
- ✅ Genre filters
- ✅ Year filters

### ♾️ Advanced UX
- ✅ Infinite scroll (IntersectionObserver)
- ✅ Lazy loading images
- ✅ Bidirectional navigation (movies ↔ actors)
- ✅ Responsive design (mobile-first)

### 🧪 Testing
- ✅ 25 automated tests (Vitest)
- ✅ Integration tests

---

## Tech-Stack

### Core
- **React 19.1** - Modern UI library with hooks
- **TypeScript 5.8** - Type safety with strict mode
- **Vite 7.1** - Ultra-fast build tool (HMR in <100ms)

### Styling & UI
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **PostCSS + Autoprefixer** - Cross-browser compatibility

### Backend & API
- **Supabase 2.47** - Authentication & Database
- **TMDB API** - Movie/Series data
- **Fetch API** - HTTP requests (native, no dependencies)

### Forms & Validation
- **React Hook Form 7.64** - Performant form management
- **Zod 4.1** - TypeScript-first schema validation
- **@hookform/resolvers 5.2** - Integration between RHF and Zod

### Routing
- **React Router 7.9** - Client-side routing

### Testing
- **Vitest 3.2** - Unit & integration testing
- **Testing Library** - React component testing
- **Happy DOM** - Lightweight DOM implementation

### Development Tools
- **ESLint 9** - Code linting
- **TypeScript ESLint** - TypeScript-specific rules

---

## Installation

#
```bash
# Clone the repository
git clone <repository-url>
cd sprint7

# Install dependencies (396 optimized packages)
npm install

# Configure environment variables
cp .env.example .env

# Edit .env with your credentials
```

---

## Configuration

### Environment Variables

Create a \`.env\` file in the project root:

#
```env
# Supabase (Authentication)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# TMDB API (Movie Data)
VITE_TMDB_API_KEY=your_tmdb_api_key
```

### Getting Credentials

**Supabase:**
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Copy URL and anon key from Settings → API

**TMDB:**
1. Create account at [themoviedb.org](https://www.themoviedb.org)
2. Go to Settings → API → Request API Key
3. Copy API Key

---

## Available-Scripts

#
```bash
# Development
npm run dev          # Start server at http://localhost:5173

# Build
npm run build        # Compile TypeScript + production build

# Testing
npm test             # Run tests with Vitest
```

---

## Testing

**Tests cover:**
- ✅ Login/Logout flow
- ✅ Movie search
- ✅ Filters (genre, year)
- ✅ Page navigation
- ✅ Protected routes
- ✅ Infinite scroll

---


## Project-Structure

```
src/
├── App.tsx
├── main.tsx
├── index.css
├── setupTests.ts
├── vitest-setup.d.ts
│
├── api/
│   └── apiClient.ts
│
├── auth/
│   └── AuthContext.tsx
│
├── components/
│   ├── atoms/
│   │   ├── Button.tsx
│   │   ├── CastCard.tsx
│   │   ├── FormInput.tsx
│   │   ├── Input.tsx
│   │   ├── MovieCard.tsx
│   │   └── SeriesCard.tsx
│   ├── molecules/
│   │   ├── FilterPanel.tsx
│   │   └── SearchBar.tsx
│   ├── organisms/
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   ├── templates/
│   │   └── MediaListPage.tsx
│   └── utils/
│       └── ScrollToTop.tsx
│
├── config/
│   ├── supabase.ts
│   ├── tmdb.ts
│   └── types.ts
│
├── hooks/
│   ├── useGenres.ts
│   ├── useInfiniteScroll.ts
│   ├── useMovieDetails.ts
│   ├── useMovies.ts
│   ├── usePersonDetails.ts
│   ├── useSearch.ts
│   ├── useSeries.ts
│   └── useSeriesDetails.ts
│
├── pages/
│   ├── ActorDetailsPage.tsx
│   ├── AuthPage.tsx
│   ├── MovieDetailsPage.tsx
│   ├── MoviesPage.tsx
│   ├── SeriesDetailsPage.tsx
│   ├── SeriesPage.tsx
│   └── WelcomePage.tsx
│
├── routes/
│   ├── ProtectedRoute.tsx
│   └── paths.ts
│
├── schemas/
│   └── authSchema.ts
│
└── utils/
  ├── format.ts
  └── tests/
    ├── app.integration.test.tsx
    └── app.moscow.test.ts
```

---

## Best-Practices

### Code Quality
- ✅ TypeScript strict mode
- ✅ ESLint configured
- ✅ Custom hooks for reusable logic
- ✅ Atomic Design pattern
- ✅ Centralized configuration
- ✅ DRY principle (reusable templates)
- ✅ React Hook Form for form management
- ✅ Zod schemas for validation

### Performance
- ✅ Lazy loading images
- ✅ Infinite scroll with IntersectionObserver
- ✅ Fetch API

### UX/UI
- ✅ Responsive design (mobile-first)
- ✅ Loading states
- ✅ Error handling
- ✅ Semantic HTML

### Testing
- ✅ 25 automated tests
- ✅ Integration tests
- ✅ Vitest + Testing Library

---

## Deployment

### Production Build

```bash
npm run build
```

Generates the \`dist/\` folder ready for deployment.

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables in Vercel

Configure in Vercel Dashboard → Settings → Environment Variables:
- \`VITE_SUPABASE_URL\`
- \`VITE_SUPABASE_ANON_KEY\`
- \`VITE_TMDB_API_KEY\`