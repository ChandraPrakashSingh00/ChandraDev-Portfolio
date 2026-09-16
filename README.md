# MERN Developer Portfolio

A premium, animated developer portfolio built with the MERN stack — React (Vite) + Tailwind + Framer Motion on the frontend, Express + MongoDB on the backend.

```
portfolio-mern/
├── frontend/   React + Vite + Tailwind + Framer Motion
└── backend/    Express + MongoDB + JWT + Cloudinary + Nodemailer
```

## Features

- Animated hero with typing effect, gradient blobs, particles, and mouse-tilt 3D card
- Scroll-reveal animations throughout (Framer Motion + Intersection Observer)
- Skills grid with animated progress bars and 3D tilt cards
- Projects section with search, category filters, pagination, and a detail modal
- Animated experience timeline, auto-playing testimonials slider, animated stat counters
- Contact form wired to a real Express API: validation, MongoDB storage, email notification, toasts
- Admin-ready backend: JWT auth, project CRUD with Cloudinary image uploads, rate limiting, sanitization
- Fully responsive, accessible (visible focus states, reduced-motion support), SEO/OG meta tags

## Prerequisites

- Node.js 18+
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- (Optional, for full functionality) A [Cloudinary](https://cloudinary.com) account and an SMTP account (e.g. Gmail with an [App Password](https://myaccount.google.com/apppasswords)) for email notifications

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and fill in:

- `MONGO_URI` — your MongoDB connection string
- `JWT_SECRET` — any long random string
- `CLIENT_URL` — `http://localhost:5173` for local dev
- `SMTP_*` and `CONTACT_RECEIVER_EMAIL` — optional, enables email notifications for contact form submissions
- `CLOUDINARY_*` — optional, enables image uploads for the admin project CRUD API
- `ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` — used by the seed script below

Seed an admin user and a couple of sample projects:

```bash
npm run seed
```

Start the API:

```bash
npm run dev
```

The API runs on `http://localhost:5000` by default. Health check: `GET /api/health`.

### API overview

| Method | Route                    | Access        | Description                     |
|--------|---------------------------|---------------|----------------------------------|
| POST   | `/api/contact`            | Public        | Submit the contact form          |
| GET    | `/api/contact`            | Admin (JWT)   | List messages                    |
| PATCH  | `/api/contact/:id/read`   | Admin (JWT)   | Mark a message read              |
| DELETE | `/api/contact/:id`        | Admin (JWT)   | Delete a message                 |
| GET    | `/api/projects`           | Public        | List projects (`?category=&search=`) |
| GET    | `/api/projects/:id`       | Public        | Get one project                  |
| POST   | `/api/projects`           | Admin (JWT)   | Create project (multipart `image`) |
| PUT    | `/api/projects/:id`       | Admin (JWT)   | Update project                   |
| DELETE | `/api/projects/:id`       | Admin (JWT)   | Delete project                   |
| POST   | `/api/auth/login`         | Public        | Admin login, returns JWT         |
| GET    | `/api/auth/me`            | Admin (JWT)   | Current admin profile            |

## 2. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The site runs on `http://localhost:5173`. It's currently wired to the static data in `src/data/` for the Skills, Projects, Experience, Testimonials, and Services sections — this keeps the site instantly viewable without a running backend. The Contact form is the one piece already calling the live API (`src/lib/api.js`).

To make the **Projects** section pull from the database instead of static data, swap the import in `src/components/Projects.jsx` from `../data/projects` to a `fetchProjects()` call (already implemented in `src/lib/api.js`).

### Personalizing the content

- Replace the name, bio, and social links in `Navbar.jsx`, `Hero.jsx`, `About.jsx`, `Contact.jsx`, and `Footer.jsx`
- Update `src/data/*.js` with your own skills, projects, experience, testimonials, and services
- Add your resume file at `frontend/public/resume.pdf` (the Download Resume buttons link to `/resume.pdf`)
- Replace the placeholder Unsplash/pravatar images with your own photography

## 3. Production build

```bash
cd frontend
npm run build   # outputs to frontend/dist
```

Deploy `frontend/dist` to any static host (Vercel, Netlify, etc.) and the `backend/` folder to any Node host (Render, Railway, Fly.io, a VPS). Set `VITE_API_URL` on the frontend to your deployed API URL, and `CLIENT_URL` on the backend to your deployed frontend URL for CORS.

## Tech stack

**Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, React Router DOM, Lucide Icons, React Type Animation, React Intersection Observer, Axios

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, Multer + Cloudinary, Nodemailer, express-validator, Helmet, express-rate-limit, express-mongo-sanitize
