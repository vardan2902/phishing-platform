# Phishing Imitation Platform

This is the frontend for the **Phishing Imitation Platform**. It uses React with TypeScript for building a phishing simulation interface, and Vite for a fast and modern development experience.

---

## Features

- **React with TypeScript**: Ensures type safety and a scalable codebase.
- **Vite**: Lightning-fast development server and optimized production builds.
- **Authentication**:
    - Login and register users using JWT.
- **Phishing Simulation**:
    - Submit phishing email attempts.
    - View phishing logs and user clicks.
- **API Integration**:
    - Connects seamlessly with the backend Phishing API.

---

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file for environment variables:
   ```env
   VITE_API_BASE_URL=http://localhost:4000
   ```
   Replace `http://localhost:4000` with your backend API base URL.

---

## Running the App

```bash
# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

---

## Project Structure

```plaintext
phishing-frontend/
├── src/
│   ├── core/                 # Axios instance and API utilities
│   ├── components/           # Reusable React components
│   ├── pages/                # Pages for different routes (SignIn, SignUp, Home, etc.)
│   ├── router/               # React Router setup
│   ├── store/                # Zustand state management
│   ├── schema-validators/    # Yup schemas for form validation
│   ├── types/                # Shared TypeScript types
│   └── utils/                # Utility functions
├── public/                   # Static assets
├── .env                      # Environment variables
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
└── package.json              # NPM dependencies and scripts
```

---

## ESLint Configuration

This project includes a robust ESLint setup for consistent and error-free coding. It is tailored for React, TypeScript, and Vite projects.

---

## Pages and Routes

The application is structured using React Router for easy navigation:

| Path       | Description               |
|------------|---------------------------|
| `/`        | Home page (protected).    |
| `/sign-in` | User login page.          |
| `/sign-up` | User registration page.   |

Protected routes require a valid JWT token to access.

---

## State Management

The application uses Zustand for lightweight and efficient state management. Example store:

---
