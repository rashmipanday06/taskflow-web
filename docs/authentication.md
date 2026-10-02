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


# Login

## 1. Purpose

The Login feature allows an existing user to authenticate with their email and password.

The login flow is responsible for:

* Collecting login credentials
* Sending credentials to the authentication API
* Handling loading and errors
* Storing authenticated user information in Redux
* Redirecting the user to the dashboard after successful login

---

## 2. Component Structure

```text
LoginPage
   │
   └── LoginForm
         │
         └── TextField / PasswordField / Button
```

### LoginForm

`LoginForm` is responsible only for the UI and form submission.

Responsibilities:

* Render email and password fields
* Collect form values
* Prevent the browser's default form submission
* Create a `LoginCredentials` object
* Pass credentials to the parent through `onSubmit`

It does not communicate with the API or Redux.

### LoginPage

`LoginPage` handles the authentication flow.

Responsibilities:

* Manage loading state
* Manage login error state
* Call the authentication API
* Dispatch authenticated user information to Redux
* Navigate to the dashboard after successful login

---

## 3. Login Data Flow

```text
User enters email/password
          ↓
      LoginForm
          ↓
   LoginCredentials
          ↓
      LoginPage
          ↓
      authApi.login()
          ↓
       apiClient
          ↓
 POST /auth/login
          ↓
       Backend API
          ↓
      AuthResponse
          ↓
 dispatch(setCredentials())
          ↓
      Redux Auth State
          ↓
 navigate("/dashboard")
```

---

## 4. Login API

The API request is handled inside `authApi.ts`.

```ts
export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>(
      "/auth/login",
      credentials
    );

    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
};
```

The API layer is responsible for communication with the backend.

The component does not directly use Axios.

---

## 5. API Client

`apiClient.ts` contains the shared Axios configuration.

```ts
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
```

This keeps API configuration centralized instead of configuring Axios separately in every API function.

---

## 6. Error Handling

API errors are normalized through `getApiError()`.

```text
Axios / unknown error
        ↓
   getApiError()
        ↓
   Normalized ApiError
        ↓
     LoginPage
        ↓
    errorMessage
        ↓
       Alert
```

The normalized error has the following structure:

```ts
interface ApiError {
  message: string;
  status?: number;
  code?: string;
}
```

This allows the UI to work with a consistent error structure regardless of the original error source.

---

## 7. Loading State

The login page maintains a loading state while the API request is running.

```text
Submit
  ↓
isLoading = true
  ↓
API request
  ↓
Success / Error
  ↓
isLoading = false
```

The loading state is passed to `LoginForm`, which passes it to the `Button`.

This prevents the user from repeatedly submitting the login form while authentication is in progress.

---

## 8. Redux Integration

After successful authentication:

```ts
dispatch(setCredentials(response));
```

The authentication response contains:

```ts
{
  user,
  token
}
```

Redux stores this information in the global authentication state.

```text
Redux Auth State

user
token
isAuthenticated
loading
error
```

This allows other parts of the application to access authentication information without passing it through component props.

---

## 9. Successful Login

After the API returns a successful response:

```text
Login API
    ↓
AuthResponse
    ↓
setCredentials()
    ↓
Redux authentication state updated
    ↓
navigate("/dashboard")
```

The user is then redirected to the dashboard.

---

## 10. Failed Login

If the API request fails:

```text
Login API
    ↓
Error
    ↓
getApiError()
    ↓
LoginPage catch()
    ↓
setErrorMessage()
    ↓
Alert displays error
```

The user remains on the login page and can try again.

---

## 11. Separation of Responsibilities

The authentication flow follows a layered structure:

| Layer           | Responsibility                     |
| --------------- | ---------------------------------- |
| `LoginForm`     | Form UI and collecting credentials |
| `LoginPage`     | Login flow orchestration           |
| `authApi`       | Authentication API calls           |
| `apiClient`     | Axios configuration                |
| `apiError`      | Error normalization                |
| `authSlice`     | Global authentication state        |
| `authSelectors` | Reading authentication state       |

This keeps UI, API communication, error handling, and global state management separated.

---

## 12. Important Design Decisions

### Form component does not call the API

`LoginForm` only collects data and calls:

```ts
onSubmit(credentials);
```

This keeps the component reusable and focused on presentation.

### API logic is separated

API calls are kept inside `authApi.ts` instead of being written directly inside the page component.

### Errors are normalized

Different error sources are converted into a predictable `ApiError` structure.

### Authentication state is global

User and token information are stored in Redux because authentication state is required by multiple parts of the application.

### Environment variables are used

The API base URL is stored in:

```env
VITE_API_BASE_URL=...
```

This prevents the API URL from being hardcoded into individual API functions.

---

## 13. Current Backend Status

The frontend login flow is connected to:


POST /auth/login


The backend authentication endpoint is not implemented yet.

Therefore, during frontend development, a `404` response is expected until the backend endpoint exists.

The frontend architecture does not need to change when the backend is implemented as long as the API contract remains:


interface AuthResponse {
  user: User;
  token: string;
}


---

## 14. Interview Explanation

> "For the login flow, I keep the form component responsible only for collecting credentials. The page component orchestrates the authentication process by calling a dedicated auth API function. The API layer uses a shared Axios client and normalizes errors through a common error handler. After successful authentication, the user and token are stored in Redux using `setCredentials`, and the user is redirected to the dashboard. This separation keeps UI, API communication, error handling, and global authentication state independent."
