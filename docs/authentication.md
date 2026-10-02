# Authentication

## Structure


features/auth/
├── components/
├── pages/
├── authTypes.ts
├── authSlice.ts
├── authSelectors.ts
└── authApi.ts

services/
├── api/
│   └── apiClient.ts
└── storage/


## Responsibilities

* `authTypes.ts` → Authentication TypeScript contracts
* `authSlice.ts` → Authentication state in Redux
* `authSelectors.ts` → Read authentication state
* `authApi.ts` → Login/Register API functions
* `apiClient.ts` → Central Axios configuration
* `storage/` → Token/session persistence

## Redux Auth State


auth
├── user
├── token
├── isAuthenticated
├── loading
└── error


## Authentication Flow


LoginPage
    ↓
authApi.login()
    ↓
apiClient
    ↓
POST /auth/login
    ↓
Backend
    ↓
{ user, token }
    ↓
setCredentials()
    ↓
Redux
    ↓
ProtectedRoute
    ↓
Dashboard


## Main Principle

UI → API → Axios → Backend → Response → Redux → UI

Each layer has a separate responsibility.
