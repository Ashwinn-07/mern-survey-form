# mern-survey-form

A full-stack survey form application built with the MERN stack (MongoDB, Express, React, Node.js). Users can submit survey responses, and an authenticated admin dashboard allows viewing submissions with pagination. Cookie-based JWT authentication secures admin routes.

---

## 📂 Repository Structure

```
mern-survey-project/
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   ├── surveyController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── auth.js            # JWT cookie auth
│   ├── models/
│   │   ├── surveySchema.js
│   │   └── adminSchema.js
│   ├── routes/
│   │   ├── surveyRoutes.js
│   │   └── adminRoutes.js
│   ├── utils/
│   │   ├── constants.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── vercel.json            # Vercel config for SPA client-side routing (rewrites all paths to index.html)
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── index.html
│   ├── eslint.config.js
│   └── src/
│       ├── api/axios.js
│       ├── store/auth.js
│       ├── components/
│       │   ├── Navbar.jsx
│       │   └── ProtectedRoute.jsx
│       ├── pages/
│       │   ├── SurveyForm.jsx
│       │   ├── AdminLogin.jsx
│       │   ├── AdminDashboard.jsx
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
└── README.md
```

> **Note:** There is no `.env.example` file in this structure; see the **Environment Variable Templates** section below for the required variables and how to set up `.env.example` locally.

## ⚙️ Environment Variable Templates

**backend/.env.example**

```dotenv
# MongoDB connection string (e.g. mongodb+srv://user:pass@cluster.mongodb.net/dbname)
MONGODB_URI=
# JWT secret (choose a strong random string)
JWT_SECRET=
# FRONTEND URL (e.g. http://localhost:5173)
FRONTEND_URL=
# Port number (specify the port number)
PORT=3000
```

**frontend/.env.example**

```dotenv
# Base URL for API calls (backend URL)
VITE_BACKEND_URL=http://localhost:3000/api
```

> **Note:** The `scripts/createAdmin.js` seed script is not committed to this repo. To create the initial admin user, create the seed script locally and run `npm run seed-admin` (or `node scripts/createAdmin.js`).

---

## 🚀 Local Setup

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB instance (local or Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/Ashwinn-07/mern-survey-form.git
cd mern-survey-form
```

### 2. Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your MONGO_URI and JWT_SECRET
npm install

# Recreate and run the admin seed script:
# 1) In backend/scripts/createAdmin.js, add the seed code
# 2) Add "seed-admin": "node scripts/createAdmin.js" under "scripts" in package.json
npm run seed-admin

# Start the server in development mode
npm run dev
```

- **Admin credentials** (default): `admin` / `admin123`
- Backend runs at `http://localhost:3000`

### 3. Frontend Setup

```bash
cd ../frontend
cp .env.example .env
# Edit .env with VITE_BACKEND_URL=http://localhost:3000/api
npm install
npm run dev
```

- Opens in your browser at `http://localhost:5173`

---

## 🌐 Deployment

### Backend (Render)

The backend is hosted on [Render](https://render.com).

- **URL:** `https://mern-survey-form-03ez.onrender.com`
- **Start Command:** `npm start`
- **Root Directory:** `backend`
- **Environment Variables (Render Dashboard):**
  ```env
  MONGODB_URI=your_mongo_connection_string
  JWT_SECRET=your_jwt_secret
  PORT=3000
  FRONTEND_URL=https://mern-survey-form.vercel.app/
  ```

Link your GitHub repository in Render, and configure the above vars: Render will redeploy on each push to the main branch.

### Frontend (Vercel)

The frontend is hosted on [Vercel](https://vercel.com).

- **URL:** `https://mern-survey-form.vercel.app/`
- **Root Directory:** `frontend`
- **vercel.json:** Located in the `frontend` folder to handle SPA routing.
- **Framework Preset:** Vite (Static Site).
- **Environment Variables (Vercel Dashboard):**
  ```env
  VITE_BACKEND_URL=https://mern-survey-form-03ez.onrender.com/api
  ```

Push to your GitHub repository to trigger a Vercel deployment. Your frontend will use the above URL to call your Render‑hosted backend.

---

## 🔧 Design Decisions & Challenges

- **Authentication Flow:** Chose cookie-based JWT for admin auth to simplify token storage and automatically include credentials via `withCredentials` in Axios, reducing XSS risks.
- **State Management:** Used Zustand for minimal global state (auth only), avoiding heavier solutions like Redux given the app’s scope.
- **API Communication:** Abstracted API calls through a shared Axios instance with environment-based base URLs, easing transitions between local dev (http://localhost) and production (Render & Vercel).
- **Deployment Strategy:** Hosted the backend on Render for full Node process support and the frontend on Vercel for optimized static hosting. A `vercel.json` ensures SPA routing.
- **Styling & UX:** Leveraged Tailwind CSS and Lucide icons for a modern, responsive UI. Client-side pagination ensures performance for small-to-medium data sets, with room to switch to server-side as data grows.
- **Challenges Faced:**
  - Configuring CORS across Render & Vercel domains required careful alignment of `FRONTEND_URL` and `VITE_BACKEND_URL` env vars.
  - Implementing SPA client-side routing on Vercel using `vercel.json` to ensure refreshes of nested routes don’t 404.
