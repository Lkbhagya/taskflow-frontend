# TaskFlow — Task Management System

Enterprise-grade team workflow frontend built with React, Vite, TypeScript, SCSS, and React Router.

## Getting Started

```bash
npm install
npm run dev
```

## Demo Accounts

| Email | Password | Role |
|-------|----------|------|
| admin@taskflow.com | password123 | ADMIN |
| jane@taskflow.com | password123 | USER |
| john@taskflow.com | password123 | USER |

## Folder Structure

```
src/
├── components/
│   ├── common/          # Button, Input, Badge, ProtectedRoute, states
│   ├── layout/          # AuthLayout, AppLayout, Sidebar, TopBar
│   ├── task/            # TaskTable, TaskForm, filters, badges, stats
│   └── user/            # UserSelect, UserList, UserProfileCard
├── context/             # AuthContext
├── hooks/               # useAuth, useTasks
├── pages/
│   ├── auth/            # Login, Register, ForgotPassword
│   ├── dashboard/       # Dashboard
│   ├── tasks/           # TaskList, TaskDetails, CreateTask, EditTask
│   └── users/           # Profile, Users (admin)
├── routes/              # router.tsx
├── services/            # authService, taskService, api
├── styles/              # variables, themes, mixins, globals
├── types/
└── utils/
```

## Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/login` | Public | Sign in |
| `/register` | Public | Create account |
| `/dashboard` | Protected | Task statistics & recent tasks |
| `/tasks` | Protected | Task list with search/filter |
| `/tasks/create` | Protected | Create task |
| `/tasks/:id` | Protected | Task details |
| `/tasks/:id/edit` | Protected | Edit task |
| `/profile` | Protected | User profile |
| `/users` | Admin only | User management |

## Environment

```env
VITE_API_BASE_URL=/api
VITE_USE_MOCK=true
```

Set `VITE_USE_MOCK=false` when connecting to a real backend.

## Scripts

- `npm run dev` — Development server
- `npm run build` — Production build
- `npm run preview` — Preview production build
