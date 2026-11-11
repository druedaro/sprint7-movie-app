# 🎬 MovieApp - Movies & Series Explorer

![Demo](./assets/demo.gif)

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

## 🛠️ Tech Stack

### Frontend & Core
![React](https://img.shields.io/badge/React-19.1-61DAFB?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

### Backend & Services
![Supabase](https://img.shields.io/badge/Supabase-2.47-3ECF8E?style=flat&logo=supabase&logoColor=white)
![TMDB](https://img.shields.io/badge/TMDB-API-01D277?style=flat&logo=themoviedatabase&logoColor=white)

### Forms & Routing
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7.64-EC5990?style=flat&logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-4.1-3E67B1?style=flat&logo=zod&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.9-CA4245?style=flat&logo=reactrouter&logoColor=white)

### Testing & Quality
![Vitest](https://img.shields.io/badge/Vitest-3.2-6E9F18?style=flat&logo=vitest&logoColor=white)
![Testing Library](https://img.shields.io/badge/Testing_Library-React-E33332?style=flat&logo=testinglibrary&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?style=flat&logo=eslint&logoColor=white)

---

## Installation

#
```bash
# Clone the repository
git clone <https://github.com/druedaro/sprint7-movie-app.git>
cd sprint7

# Install dependencies (396 optimized packages)
npm install

# Configure environment variables
cp .env.local .env

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
npm run seo:lint     # Audit the generated dist/ HTML (run after build)

# Testing
npm test             # Run tests with Vitest
```

The SEO workflow runs `seo-lint` on every push and pull request to `develop` and `main`. It checks static HTML and basic metadata, structure, sitemap/robots, structured data, and selected GEO signals; it does not render the React app or provide a complete SEO/AEO audit.

---

## Testing

**11 Core Tests (Moscow Method):**
- ✅ Media List - Success & Failure Cases (5 tests)
- ✅ Search - Success & Failure Cases (3 tests)
- ✅ Real hook behavior with mocked fetchAPI
- ✅ Auth - Success & Failure Cases (3 tests)

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
│   └── apiClient.ts          
│
├── auth/
│   ├── AuthContext.tsx    
│   └── AuthProvider.tsx     
│
├── components/
│   ├── atoms/               
│   │   ├── Button.tsx       
│   │   ├── FormInput.tsx
│   │   └── Input.tsx      
│   ├── molecules/          
│   │   ├── CastCard.tsx      
│   │   ├── FilterPanel.tsx   
│   │   ├── MovieCard.tsx  
│   │   ├── SearchBar.tsx    
│   │   └── SeriesCard.tsx  
│   ├── organisms/           
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   └── templates/          
│       ├── MediaDetailsPage.tsx
│       └── MediaListPage.tsx
│
├── config/
│   ├── supabase.ts        
│   └── tmdb.ts             
│
├── hooks/             
│   ├── useAuth.ts        
│   ├── useGenres.ts        
│   ├── useInfiniteScroll.ts 
│   ├── useMediaDetails.ts
│   ├── useMediaList.ts   
│   ├── usePersonDetails.ts  
│   ├── useScrollToTop.ts 
│   └── useSearch.ts      
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
│   ├── paths.ts            
│   └── ProtectedRoute.tsx  
│
├── schemas/
│   └── authSchema.ts       
│
├── services/             
│   ├── movieService.ts     
│   ├── seriesService.ts    
│   └── personService.ts    
│
├── types/                 
│   ├── domain.ts          
│   └── common.ts           
│
└── utils/
    ├── formatters.ts       
    └── tests/
        ├── app.moscow.test.ts
        ├── auth.moscow.test.ts
        └── __mocks__/
            └── apiMocks.ts
```

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
- ✅ 8 core tests (Moscow Method) + 3 auth tests
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