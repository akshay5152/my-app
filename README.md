# Multi-Tenant Web Application

A full-stack multi-tenant application built with **React 18**, **Vite**, **Express**, **TypeScript**, and **MongoDB**. The platform provides dynamic domain-based tenant resolution, custom tenant-level branding, and calendar/event management capabilities.

🌐 **Architecture**: Modular full-stack with isolated tenant configurations and real-time data synchronization.

## 🎯 Overview

This repository provides a production-ready multi-tenant web application architecture designed to support isolated tenant configurations and branding, backed by an Express REST API and a React client. It includes advanced features like calendar management, event scheduling, cursor-based pagination, and dynamic theming.

---

## ✨ Key Features

### 🏢 Multi-Tenant Support
- **Automatic Tenant Detection**: Automatically resolves tenants using request hostnames/domains or the `x-tenant-id` HTTP header
- **Dynamic Theming**: Applies tenant-specific color palettes (primary, secondary, accent) via CSS variables
- **Tenant Context**: React Context (`TenantContext`) provides tenant state and error handling across components
- **Tenant Layout**: Dedicated layout component with tenant-branded header, navigation, and footer

### 📅 Calendar & Event Management
- **Interactive Calendar & Todo Views**: Toggle between monthly calendar view and task management
- **Self & Team Filtering**: Switch perspective between personal schedule and team-wide events
- **Modal Event Creation**: Dialog-driven event forms with input validation, date/time pickers, and supervisor assignment
- **Prebuilt UI Components**: Accessible Radix UI + Tailwind CSS primitives (Dialog, Select, Button, Card, etc.)

### 🛠️ Robust Backend & Data Access
- **Express & TypeScript API**: Modular backend with middleware for tenant isolation
- **Repository Pattern**: Extensible `BaseRepository` implementing Relay-style cursor-based pagination
- **Dynamic Port Selection**: Automatic port conflict handling
- **Database Resilience**: MongoDB Atlas integration with Mongoose and graceful error handling

---

## 📦 Tech Stack

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

## 📁 Project Architecture & Structure

```
my-app/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and SVG icons
│   ├── components/         # React components
│   │   ├── layout/         # Layout wrappers (TenantLayout.tsx)
│   │   ├── ui/             # Radix UI + Tailwind primitives
│   │   ├── Calendar.jsx    # Interactive calendar component
│   │   └── EventDialog.jsx # Event creation dialog
│   ├── contexts/           # React Context providers
│   │   ├── TenantContext.tsx  # Tenant state management
│   │   └── ThemeProvider.tsx  # Dynamic CSS variables
│   ├── lib/                # Shared utilities
│   ├── repositories/       # Data access layer
│   │   ├── BaseRepository.ts   # Generic repository with pagination
│   │   └── TenantRepository.ts # Tenant-specific operations
│   ├── server/             # Express backend
│   │   ├── config/         # Database configuration
│   │   ├── middleware/     # Tenant resolution middleware
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API endpoints
│   │   └── index.ts        # Server entry point
│   ├── types/              # TypeScript declarations
│   ├── utils/              # Helper functions
│   ├── App.jsx             # Application root
│   └── main.jsx            # React DOM mounting
├── eslint.config.js        # ESLint configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.cjs         # Vite bundler configuration
└── vitest.config.js        # Vitest testing configuration
```

---

## 🏗️ Multi-Tenancy Design

### Tenant Resolution
Tenants are resolved in two complementary ways:
- **Hostname / Subdomain**: Request hostname (e.g., `client1.example.com`) matched against the `domain` field in the database
- **Custom Header**: Requests containing `x-tenant-id` allow explicit tenant targeting

### Dynamic Theming
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

The `ThemeProvider` binds these colors to CSS variables, dynamically restyling the application.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.x or higher
- **npm** or **yarn**
- **MongoDB**: A running MongoDB instance or MongoDB Atlas cluster URI

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/akshay5152/tenant-app.git
   cd tenant-app
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

*(If `MONGODB_URI` is not provided, the server defaults to MongoDB Atlas URI in `src/server/config/database.ts`)*

### Development

Start both frontend and backend:

```bash
npm run dev:all
```

Or run separately:
- **Frontend**: `npm run dev` (Vite on port 5173)
- **Backend**: `npm run server` (Express on port 3001)

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite frontend (port 5173) |
| `npm run server` / `npm run dev:server` | Start Express backend with auto-reload (port 3001) |
| `npm run dev:all` | Concurrently run frontend and backend |
| `npm run build` | Build for production |
| `npm run serve` | Preview production build locally |
| `npm run test` | Run test suite with Vitest |
| `npm run lint` | Lint TypeScript and JSX files |

---

## 🔌 API Reference

### Health Check
- **`GET /health`**
  - Response: `{ "status": "ok" }`

### Tenant Endpoints

**Detect Tenant**
- **`GET /api/tenants/detect?domain=<hostname>`**
  - Detects and returns tenant metadata based on domain
  - Response: `200 OK` with Tenant object, or `404 Not Found`

**Create Tenant**
- **`POST /api/tenants`**
  - Creates a new tenant
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

**Update Tenant Settings**
- **`PATCH /api/tenants/:id/settings`**
  - Updates configuration and theme for a tenant
  - Body: `{ "settings": { ... } }`
  - Response: `200 OK`

---

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Tests include:
- Calendar component tests
- Event creation form tests
- Todo management tests
- Integration tests

---

## 🚀 Deployment

### Deploy to Vercel
```bash
vercel
```

### Deploy to Heroku
```bash
heroku create
git push heroku main
```

### Deploy to AWS
Configure AWS CLI and deploy via CodeDeploy or Elastic Beanstalk.

---

## 📚 Documentation & Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Radix UI Components](https://www.radix-ui.com/docs/primitives/overview/introduction)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is private and proprietary.

---

## 💬 Support

For issues or questions, please open a [GitHub Issue](https://github.com/akshay5152/tenant-app/issues).

---

**Built by**: Akshay  
**Last Updated**: 2026  
**Maintained**: ✅ Active  
**Production Ready**: ✅ Yes
