# OptiChain — Supply Chain Consulting Platform

> A full-stack MERN consultancy platform for Indian SMEs to optimise their supply chains, measure ESG compliance, book expert consultations, track project progress, and submit feedback — all with role-based dashboards.

---


## ✨ Live Features

- 🔗 **Supply Chain Consulting** — End-to-end service listings across 7 domains
- 🌱 **ESG Calculator** — Interactive 3-step assessment with scoring and recommendations
- 📁 **Case Studies** — Real-world project outcomes with measurable results
- ✍️ **Blog** — Thought leadership on supply chain, Six Sigma, and sustainability
- 🏭 **Industry Pages** — Sector-specific solutions for 6 industries
- 📅 **Consultation Booking** — Lead capture and scheduling system with email confirmations
- 💬 **Feedback System** — Clients submit star ratings + comments; visible publicly after admin approval
- 👤 **Client Dashboard** — Live project tracking, reports, consultations, ESG history (all connected to MongoDB)
- 🛡️ **Admin Panel** — Manage consultations, blogs, case studies, feedback, ESG results (all live from DB)
- 🔐 **JWT Auth** — Role-based access (client / admin) with cookie-based sessions

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router v6, Framer Motion |
| Styling | Vanilla CSS (custom design system) |
| Backend | Node.js, Express.js |
| Database | MongoDB (local / MongoDB Atlas) |
| Auth | JWT (JSON Web Tokens) with HttpOnly cookies |
| Email | Nodemailer (Gmail SMTP) |
| Icons | React Icons (Feather) |
| Forms | React Hook Form |
| Toasts | React Hot Toast |

---

## 📂 Project Structure

```
optichain/
├── client/                     # React + Vite frontend
│   └── src/
│       ├── App.jsx             # All routes with lazy loading
│       ├── index.css           # Global design system
│       ├── main.jsx            # Entry point
│       ├── components/         # Navbar, Footer, ProtectedRoute, ScrollToTop
│       ├── context/            # AuthContext (global auth state)
│       ├── utils/              # Axios instance, helpers
│       └── pages/
│           ├── Home/           # Landing page with pain points, services, testimonials
│           ├── About/          # Team and mission
│           ├── Services/       # Service listing + detail pages (7 services)
│           ├── Industries/     # Industry listing + detail pages (6 industries)
│           ├── CaseStudies/    # Case study listing + detail pages
│           ├── Blog/           # Blog listing + post pages
│           ├── ESGCalculator/  # 3-step ESG assessment + results
│           ├── Contact/        # Consultation booking form
│           ├── Pricing/        # Service tiers and packages
│           ├── Feedback/       # ⭐ Public feedback submission + approved reviews
│           ├── Login/          # JWT login
│           ├── Register/       # Client registration
│           ├── Dashboard/      # Client portal (protected, all live from DB)
│           │   ├── index.jsx         # Overview — live stats + quick links
│           │   ├── Projects.jsx      # Real projects with progress bars + reports
│           │   ├── Reports.jsx       # Aggregated reports from all projects
│           │   ├── Consultations.jsx # Real bookings with status + booking refs
│           │   └── ESGHistory.jsx    # ESG score history with trends
│           ├── Admin/          # Admin panel (admin-only, all live from DB)
│           │   ├── Dashboard.jsx     # Live platform stats with links
│           │   ├── Consultations.jsx # Manage bookings — change status, delete
│           │   ├── Blogs.jsx         # Manage posts — publish/unpublish, delete
│           │   ├── CaseStudies.jsx   # Manage case studies — delete
│           │   ├── Feedback.jsx      # View all feedback — page stats, ratings
│           │   └── EsgResults.jsx    # View all ESG submissions — scores, grades
│           └── NotFound/       # 404 page
│
└── server/                     # Express.js backend
    └── src/
        ├── index.js            # Server entry point
        ├── app.js              # Express app setup, middleware, CORS, routes
        ├── db/                 # MongoDB connection
        ├── models/             # Mongoose schemas
        │   ├── User.model.js         # name, email, password, role (client/admin)
        │   ├── Consultation.model.js # booking with bookingRef, status, service
        │   ├── Blog.model.js         # title, slug, category, content, views
        │   ├── CaseStudy.model.js    # title, industry, service, metrics
        │   ├── EsgResult.model.js    # company data, scores, recommendations
        │   ├── Feedback.model.js     # page, rating, comment, isApproved
        │   └── Project.model.js      # clientId, title, status, progress, reports
        ├── controllers/        # Route handler logic
        ├── routes/             # API route definitions
        ├── middleware/         # JWT auth, role guards, error handler
        ├── utils/              # Email helpers, ESG scoring algorithm, async handler
        └── scripts/
            └── seedAdmin.js    # One-time script to create admin user
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **MongoDB** (local) or MongoDB Atlas account
- **Gmail** account with App Password (for Nodemailer)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/optichain.git
cd optichain
```

---

### 2. Setup the Server

```bash
cd server
npm install
```

Create your `.env` file:

```bash
cp .env.example .env
```

Fill in the values:

```env
PORT=5001
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/optichain

# JWT
JWT_SECRET=your_super_secret_key_min_32_chars
JWT_EXPIRES_IN=7d

# Nodemailer (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_16_char_app_password
ADMIN_EMAIL=admin@optichain.in

# Frontend URL
CLIENT_URL=http://localhost:5173
```

> **Note:** Use a Gmail App Password, not your regular password.
> Generate one at: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)

Start the server:

```bash
npm run dev
```

Server runs on: `http://localhost:5001`

---

### 3. Setup the Client

```bash
cd ../client
npm install
npm run dev
```

Client runs on: `http://localhost:5173`

---

### 4. Create Admin User

```bash
cd server
npm run seed:admin
```

This creates an admin account with:

| Field | Value |
|---|---|
| Email | `admin@optichain.in` |
| Password | `admin123456` |

> You can change these in `server/src/scripts/seedAdmin.js` before running.

Login at `http://localhost:5173/login` → you'll be redirected to `/admin/dashboard`.

---

## 🔌 API Endpoints

### Auth

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register new client user | Public |
| POST | `/api/auth/login` | Login and get JWT cookie | Public |
| POST | `/api/auth/logout` | Clear JWT cookie | Public |
| GET | `/api/auth/me` | Get current logged-in user | JWT |

### Consultations

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/consultations` | Book a consultation | Public |
| GET | `/api/consultations` | Get all consultations | Admin |
| GET | `/api/consultations/my` | Get my consultations | Client |
| PUT | `/api/consultations/:id` | Update consultation status | Admin |
| DELETE | `/api/consultations/:id` | Delete a consultation | Admin |

### Blogs

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/blogs` | Get all published blogs | Public |
| GET | `/api/blogs/:slug` | Get single blog post | Public |
| POST | `/api/blogs` | Create new blog post | Admin |
| PUT | `/api/blogs/:id` | Update blog post | Admin |
| DELETE | `/api/blogs/:id` | Delete blog post | Admin |

### Case Studies

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/case-studies` | Get all case studies | Public |
| GET | `/api/case-studies/:id` | Get single case study | Public |
| POST | `/api/case-studies` | Create case study | Admin |
| PUT | `/api/case-studies/:id` | Update case study | Admin |
| DELETE | `/api/case-studies/:id` | Delete case study | Admin |

### ESG Calculator

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/esg/calculate` | Submit ESG assessment | Public |
| GET | `/api/esg/results` | Get all ESG results | Admin |
| GET | `/api/esg/my-results` | Get my ESG results | Client |

### Feedback

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/feedback` | Submit feedback | Public |
| POST | `/api/feedback/public` | Get approved feedbacks | Public |
| GET | `/api/feedback` | Get all feedback + page stats | Admin |

### Projects

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/projects/my` | Get my projects | Client |
| GET | `/api/projects` | Get all projects | Admin |
| POST | `/api/projects` | Create project for client | Admin |
| PUT | `/api/projects/:id` | Update project | Admin |

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | API status check |

---

## 🌱 ESG Calculator

The ESG Calculator is a standout interactive feature:

1. **Step 1 — Company Info**: Company name, industry, employee count, revenue
2. **Step 2 — Operations**: Fleet size, energy use, water consumption, waste, renewable energy %
3. **Step 3 — Supply Chain**: Supplier count, local %, audit score, inventory turnover, rejection rate, training hours

**Output:** A composite score out of 100 with:
- ESG Score
- Supply Chain Health Score
- Overall Index
- Letter grade (A–D)
- Personalised improvement recommendations

---

## 🔐 Authentication & Roles

| Role | Access |
|---|---|
| `guest` | Public pages, ESG calculator, contact form, feedback submission |
| `client` | Dashboard, projects, reports, consultations, ESG history, feedback |
| `admin` | Full admin panel — manage all platform content, approve feedback, change consultation status |

### How Auth Works

1. User registers/logins → server sets a `token` HttpOnly cookie
2. `AuthContext` checks `/api/auth/me` on mount to restore session
3. `ProtectedRoute` guards client pages → redirects to `/login`
4. `AdminRoute` guards admin pages → redirects to `/dashboard` if not admin

---

## 📊 Data Flow

### Client Feedback Flow
```
Client visits /feedback → Submits star rating + comment
  → POST /api/feedback → Saved to MongoDB (isApproved: true by default)
  → Appears on public feedback page
  → Admin views all feedback at /admin/feedback with page-wise stats
```

### Consultation Booking Flow
```
Visitor fills form at /contact → POST /api/consultations
  → Saved with auto-generated bookingRef
  → Confirmation email sent to client (Nodemailer)
  → Notification email sent to admin
  → Admin manages status at /admin/consultations (pending → confirmed → completed)
  → Client tracks their bookings at /dashboard/consultations
```

### ESG Assessment Flow
```
User fills 3-step form at /esg-calculator → POST /api/esg/calculate
  → Server runs scoring algorithm
  → Result saved to MongoDB with scores + recommendations
  → Results displayed at /esg-calculator/results
  → Client views history at /dashboard/esg
  → Admin views all submissions at /admin/esg-results
```

---

## ⚠️ Common Issues

### Port 5000 already in use (macOS)
macOS Monterey+ reserves port 5000 for AirPlay Receiver.

**Fix:** Change `PORT=5001` in your `.env`, or go to:
> **System Settings → General → AirDrop & Handoff → AirPlay Receiver → OFF**

### MongoDB not connecting
Ensure MongoDB is running locally:
```bash
brew services start mongodb-community
```

Or use a MongoDB Atlas connection string in `MONGODB_URI`.

### CORS errors
Ensure `CLIENT_URL` in `.env` matches your frontend URL (`http://localhost:5173`).

### Login fails after seed
Make sure the **server is running** (`npm run dev`) before trying to login. The Vite proxy forwards `/api/*` to the backend.

---

## 📜 Available Scripts

### Server (`/server`)

| Command | Description |
|---|---|
| `npm run dev` | Start with nodemon (auto-reload) |
| `npm start` | Start in production mode |
| `npm run seed:admin` | Create admin user in MongoDB |

### Client (`/client`)

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## 📜 License

MIT License — free to use, modify, and distribute.

---

## 👤 Author

**Arunabha Mukhopadhyay**
Supply Chain & Technology Enthusiast
[LinkedIn](https://linkedin.com/in/arunabhamukhopadhyay) · [GitHub](https://github.com/arunabhamukhopadhyay)

---

> Built as part of a Design Thinking Hackathon — OptiChain addresses the real problem that 67% of Indian SMEs have no formal ESG reporting and lose an estimated ₹2.3L Cr annually to supply chain inefficiencies.
