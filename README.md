# Nitron

A simple application for managing pictures and albums.

## Demo

[Nitron](https://nitron.vercel.app/)


## What it does 🚀

- Create albums
- Upload pictures to albums
- View pictures in albums


## How it was built 🛠️

- Frontend: React, Tailwind CSS
- Backend: NestJS, MongoDB, Firebase Auth, Vercel CLI
- Deployment: Vercel
- Linting: Prettier
- Testing: Cypress
- Type checking: TypeScript

## How to run locally

### Preqrequisites 📝

- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)
- [MongoDB](https://docs.mongodb.com/manual/installation/) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Firebase](https://firebase.google.com/)
- [Vercel CLI](https://vercel.com/download)

### Steps 📝

1. Clone the repository

```bash
git clone https://github.com/VinGitonga/nitron-sil.git
```

2. Install dependencies

```bash
cd nitron-sil
```

3. Install dependencies for the frontend

```bash
cd client
yarn
```

4. Install dependencies for the backend

```bash
cd ..
cd backend
yarn
```

5. Create a `.env` file in the `backend` directory and add the following environment variables

```bash
MONGODB_URI=your_mongodb_uri
```

6. Create a `.env` file in the `client` directory and add the following environment variables

```bash
VITE_FIREBASE_API_KEY="your_firebase_api_key"
VITE_FIREBASE_AUTH_DOMAIN="your_firebase_auth_domain"
VITE_FIREBASE_PROJECT_ID="your_firebase_project_id"
VITE_FIREBASE_STORAGE_BUCKET="your_firebase_storage_bucket"
VITE_FIREBASE_MESSAGING_SENDER_ID="your_firebase_messaging_sender_id"
VITE_FIREBASE_APP_ID="your_firebase_app_id"
VITE_API_BASE_URL="http://localhost:8000/api"
TESTING_USER_EMAIL="your_testing_user_email"
```

7. Start the backend server

```bash
cd backend
yarn start:dev
```

8. Start the frontend server

```bash
cd ..
cd client
yarn dev
```

9. Open your browser and navigate to `http://localhost:3000`

10. Sign in with your Google account to start using the application


