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

1. **Clean Code:** Simple, maintainable code without over-engineering
2. **Performance First:** Optimized for production (141 KB gzipped)
3. **Zero Over-engineering:** Only necessary dependencies
4. **Type Safety:** TypeScript strict mode with generics
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
- ✅ 8 core tests (Moscow Method)
- ✅ Real behavior testing (mocks only fetchAPI)

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

**8 Core Tests (Moscow Method):**
- ✅ Media List - Success & Failure Cases (5 tests)
- ✅ Search - Success & Failure Cases (3 tests)
- ✅ Real hook behavior with mocked fetchAPI

---


## Project-Structure

```
src/
├── App.tsx
├── main.tsx
├── index.css
├── setupTests.ts
│
├── api/
│   └── apiClient.ts          # Fetch API wrapper
│
├── auth/
│   ├── AuthContext.tsx       # Auth context definition
│   └── AuthProvider.tsx      # Auth state management
│
├── components/
│   ├── atoms/                # Basic UI elements
│   │   ├── Button.tsx        # (with local ButtonProps)
│   │   ├── FormInput.tsx
│   │   └── Input.tsx         # (with local InputProps)
│   ├── molecules/            # Composite components
│   │   ├── CastCard.tsx      # (with local CastCardProps)
│   │   ├── FilterPanel.tsx   # (with local FilterProps)
│   │   ├── MovieCard.tsx     # (with local MovieCardProps)
│   │   ├── SearchBar.tsx     # (with local SearchBarProps)
│   │   └── SeriesCard.tsx    # (with local SeriesCardProps)
│   ├── organisms/            # Complex sections
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   └── templates/            # Page layouts (generic)
│       ├── MediaDetailsPage.tsx
│       └── MediaListPage.tsx
│
├── config/
│   ├── supabase.ts          # Supabase client
│   └── tmdb.ts              # TMDB endpoints & config
│
├── hooks/                    # Custom React hooks
│   ├── useAuth.ts           # Auth context consumer
│   ├── useGenres.ts         # Genre fetching
│   ├── useInfiniteScroll.ts # Infinite scroll logic
│   ├── useMediaDetails.ts   # Media details + credits + videos
│   ├── useMediaList.ts      # Paginated media lists
│   ├── usePersonDetails.ts  # Actor details + filmography
│   ├── useScrollToTop.ts    # Scroll restoration
│   └── useSearch.ts         # Search with debounce
│
├── pages/                    # Route pages
│   ├── ActorDetailsPage.tsx
│   ├── AuthPage.tsx
│   ├── MovieDetailsPage.tsx
│   ├── MoviesPage.tsx
│   ├── SeriesDetailsPage.tsx
│   ├── SeriesPage.tsx
│   └── WelcomePage.tsx
│
├── routes/
│   ├── paths.ts             # Route path constants
│   └── ProtectedRoute.tsx   # Auth route guard
│
├── schemas/
│   └── authSchema.ts        # Zod validation schemas
│
├── services/                 # API service layer (NEW)
│   ├── movieService.ts      # Movie API calls
│   ├── seriesService.ts     # Series API calls
│   └── personService.ts     # Person API calls
│
├── types/                    # TypeScript types (RENAMED from models/)
│   ├── domain.ts            # Domain entities (Movie, Series, Person, etc.)
│   └── common.ts            # App types (MediaType, AuthContextType, etc.)
│
└── utils/
    ├── formatters.ts        # Date/rating formatters
    └── tests/
        ├── app.moscow.test.ts
        └── __mocks__/
            └── apiMocks.ts
```

### Architecture Highlights

**Separation of Concerns:**
- **services/** - API logic isolated from hooks
- **hooks/** - Business logic & state management
- **components/** - Presentation layer (props defined locally)
- **types/** - Domain entities (domain.ts) & app types (common.ts)

**Component Props:**
Each component now defines its own props interface locally, avoiding global coupling.

**Type Organization:**
- **domain.ts** - TMDB entities (Movie, Series, Person, Genre, Credits, etc.)
- **common.ts** - Application types (MediaType, AuthContextType, TMDBResponse, etc.)

---

## Best-Practices

### Code Quality
- ✅ TypeScript strict mode with generics
- ✅ ESLint configured
- ✅ Custom hooks for reusable logic
- ✅ Atomic Design pattern
- ✅ Centralized configuration
- ✅ DRY principle (generic templates)
- ✅ React Hook Form for form management
- ✅ Zod schemas for validation
- ✅ Clean code without comments

### Performance
- ✅ Lazy loading images
- ✅ Infinite scroll with IntersectionObserver
- ✅ Native Fetch API
- ✅ Optimized bundle (141 KB gzipped)

### UX/UI
- ✅ Responsive design (mobile-first)
- ✅ Loading states
- ✅ Error handling with user-friendly messages
- ✅ Semantic HTML

### Testing
- ✅ 8 core tests (Moscow Method)
- ✅ Real hook behavior testing
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