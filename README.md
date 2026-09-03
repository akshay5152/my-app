# Multi-Tenant Web Application

A full-stack multi-tenant application built with **React**, **Vite**, **Express**, **TypeScript**, and **MongoDB**. The platform provides dynamic domain-based tenant resolution, custom tenant-level theming, cursor-based pagination, and an interactive Calendar & Event/Todo management dashboard.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Architecture & Structure](#project-architecture--structure)
- [Multi-Tenancy Design](#multi-tenancy-design)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
- [Available Scripts](#available-scripts)
- [API Reference](#api-reference)
- [Testing](#testing)
- [License](#license)

---

## Overview

This repository provides a multi-tenant web application architecture designed to support isolated tenant configurations and branding, backed by an Express REST API and a React client. It includes an event scheduling and calendar interface supporting both self and team views, event modal workflows, and responsive Radix UI-powered components.

---

## Key Features

### 🏢 Multi-Tenant Support
- **Automatic Tenant Detection**: Automatically resolves tenants on the frontend and backend using request hostnames/domains or the `x-tenant-id` HTTP header.
- **Dynamic Theming**: Applies tenant-specific color palettes (primary, secondary, accent) via CSS variables injected at runtime through `ThemeProvider`.
- **Tenant Context**: React Context (`TenantContext`) provides tenant state, loading flags, and error handling across the client component tree.
- **Tenant Layout**: Dedicated layout component (`TenantLayout`) with tenant-branded header, navigation, and footer.

### 📅 Calendar & Event Management
- **Interactive Calendar & Todo Views**: Toggle between monthly calendar view and task/todo management.
- **Self & Team Filtering**: Switch perspective between personal schedule and team-wide events.
- **Modal Event Creation**: Dialog-driven event forms with input validation, date/time pickers, mode selection, and supervisor assignment.
- **Prebuilt UI Components**: Accessible UI primitives styled with Tailwind CSS, built on Radix UI (`Dialog`, `Select`, `Button`, `Card`, `Popover`, `Input`, `Label`).

### 🛠️ Robust Backend & Data Access
- **Express & TypeScript API**: Modular backend with middleware for tenant isolation.
- **Repository Pattern**: Extensible `BaseRepository` implementing Relay-style cursor-based pagination (`first`/`last`, `before`/`after`, `edges`, `pageInfo`).
- **Dynamic Port Selection**: Port conflict handling automatically finds available ports if default port `3001` is busy.
- **Database Resilience**: MongoDB Atlas integration via Mongoose with graceful fallback handling and clean process shutdown hooks.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | [React 18](https://react.dev/) + [Vite 4](https://vitejs.dev/) |
| **Styling & UI** | [Tailwind CSS 3](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/) |
| **Date Utilities** | [date-fns](https://date-fns.org/) |
| **Routing** | [React Router DOM v6](https://reactrouter.com/) |
| **Backend Framework** | [Express 4](https://expressjs.com/) (TypeScript via [tsx](https://github.com/privatenumber/tsx)) |
| **Database & ODM** | [MongoDB](https://www.mongodb.com/) & [Mongoose 7](https://mongoosejs.com/) |
| **Testing** | [Vitest](https://vitest.dev/), Jest, Testing Library |
| **Code Quality** | ESLint, TypeScript 5 |

---

## Project Architecture & Structure

```
my-app/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and SVG icons
│   ├── components/         # React components
│   │   ├── layout/         # Layout wrappers (e.g., TenantLayout.tsx)
│   │   ├── ui/             # Radix UI + Tailwind primitives (Button, Select, Dialog, etc.)
│   │   ├── Calendar.jsx    # Interactive calendar & event overview
│   │   └── EventDialog.jsx # Event creation dialog
│   ├── contexts/           # React Context providers
│   │   ├── TenantContext.tsx # Tenant loading & resolution context
│   │   └── ThemeProvider.tsx # Dynamic CSS variables injection
│   ├── lib/                # Shared utilities & class merging (clsx, tailwind-merge)
│   ├── repositories/       # Data access layer
│   │   ├── BaseRepository.ts   # Generic repository with cursor pagination
│   │   └── TenantRepository.ts # Tenant-specific database operations
│   ├── server/             # Express backend
│   │   ├── config/         # Database connection configuration
│   │   ├── middleware/     # Tenant resolution middleware
│   │   ├── models/         # Mongoose schemas & TypeScript interfaces
│   │   ├── routes/         # Express API endpoints (/api/tenants)
│   │   └── index.ts        # Server entry point
│   ├── types/              # TypeScript declarations (Tenant, Cursor, etc.)
│   ├── utils/              # Cursor encoding & decoding helpers
│   ├── App.jsx / App.tsx   # Application root
│   └── main.jsx            # React DOM mounting & routing
├── eslint.config.js        # ESLint configuration
├── tailwind.config.js      # Tailwind CSS configuration with CSS variable bindings
├── tsconfig.json           # TypeScript configuration
├── vite.config.cjs         # Vite bundler configuration
└── vitest.config.js        # Vitest testing configuration
```

---

## Multi-Tenancy Design

### 1. Tenant Resolution
Tenants are resolved in two complementary ways:
- **Hostname / Subdomain**: Request hostname (e.g. `client1.example.com` or `localhost`) is matched against the `domain` field in the database.
- **Custom Header**: Requests containing `x-tenant-id` allow explicit tenant targeting.

### 2. Dynamic Theming
Each tenant record defines custom theme colors in `settings.theme`:
```json
{
  "theme": {
    "primary": "#2563eb",
    "secondary": "#475569",
    "accent": "#f59e0b"
  }
}
```
The client `ThemeProvider` binds these colors to root CSS variables (`--color-primary`, `--color-secondary`, `--color-accent`), dynamically restyling Tailwind color tokens across the application.

---

## Getting Started

### Prerequisites
- **Node.js**: v18.x or higher
- **npm** or **yarn**
- **MongoDB**: A running MongoDB instance or MongoDB Atlas cluster URI

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Configuration

Create a `.env` file in the project root:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/multi-tenant-db
```

*(Note: If `MONGODB_URI` is not provided in `.env`, the server defaults to the configured MongoDB Atlas URI in `src/server/config/database.ts`)*.

---

## Available Scripts

In the project directory, you can run:

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite frontend development server (default port `5173`) |
| `npm run server` / `npm run dev:server` | Starts the Express backend using `tsx watch` with auto-reload (default port `3001`) |
| `npm run dev:all` | Concurrently runs both the Vite frontend and the Express backend |
| `npm run build` | Compiles TypeScript and builds production frontend bundle into `dist/` |
| `npm run serve` | Previews the production build locally with Vite |
| `npm run test` | Runs the test suite using Vitest |
| `npm run lint` | Lints TypeScript and JSX files with ESLint |

---

## API Reference

### Health Check
- **`GET /health`**
  - Response: `{ "status": "ok" }`

### Tenant Endpoints
- **`GET /api/tenants/detect?domain=<hostname>`**
  - Detects and returns tenant metadata based on the specified domain.
  - Response: `200 OK` with Tenant object, or `404 Not Found`.

- **`POST /api/tenants`**
  - Creates a new tenant.
  - Body:
    ```json
    {
      "name": "Acme Corp",
      "domain": "acme.example.com",
      "settings": {
        "theme": {
          "primary": "#3b82f6",
          "secondary": "#64748b",
          "accent": "#10b981"
        },
        "features": ["calendar", "reports"],
        "customization": {}
      }
    }
    ```
  - Response: `201 Created`

- **`PATCH /api/tenants/:id/settings`**
  - Updates configuration and theme settings for an existing tenant.
  - Body: `{ "settings": { ... } }`
  - Response: `200 OK`

---

## Testing

Run unit and component tests with Vitest:

```bash
npm test
```

The testing setup includes tests for:
- [Calendar.test.jsx](file:///c:/my-app/src/Calendar.test.jsx)
- [CalendarForm.test.jsx](file:///c:/my-app/src/CalendarForm.test.jsx)
- [TodoForm.test.jsx](file:///c:/my-app/src/TodoForm.test.jsx)
- [App.test.jsx](file:///c:/my-app/src/App.test.jsx)

---

## License

This project is private and proprietary.
