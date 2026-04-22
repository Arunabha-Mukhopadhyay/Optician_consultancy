# OptiChain — Supply Chain Consulting Platform

> A full-stack MERN consultancy platform for Indian SMEs to optimise their supply chains, measure ESG compliance, book expert consultations, and track project progress.

---

##  Live Features

-  **Supply Chain Consulting** — End-to-end service listings across 7 domains
-  **ESG Calculator** — Interactive 3-step assessment with scoring and recommendations
-  **Case Studies** — Real-world project outcomes with measurable results
-  **Blog** — Thought leadership on supply chain, Six Sigma, and sustainability
-  **Industry Pages** — Sector-specific solutions for 6 industries
-  **Consultation Booking** — Lead capture and scheduling system
-  **Client Dashboard** — Project tracking, reports, consultations, and ESG history
-  **Admin Panel** — Platform management for blogs, consultations, feedback, and ESG results
-  **JWT Auth** — Role-based access (client / admin)

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router v6, Framer Motion |
| Styling | Vanilla CSS (custom design system) |
| Backend | Node.js, Express.js |
| Database | MongoDB (local / MongoDB Atlas) |
| Auth | JWT (JSON Web Tokens) |
| Email | Nodemailer (Gmail SMTP) |
| Icons | React Icons (Feather) |

---

##  Project Structure

```
optichain/
├── client/                     # React + Vite frontend
│   └── src/
│       ├── App.jsx             # All routes with lazy loading
│       ├── index.css           # Global design system
│       ├── main.jsx            # Entry point
│       ├── components/         # Navbar, Footer, ProtectedRoute, etc.
│       ├── context/            # Auth context (global state)
│       ├── hooks/              # Custom React hooks
│       ├── utils/              # API helpers, formatters
│       └── pages/
│           ├── Home/           # Landing page with pain points, services, testimonials
│           ├── About/          # Team and mission
│           ├── Services/       # Service listing + detail pages
│           ├── Industries/     # Industry listing + detail pages
│           ├── CaseStudies/    # Case study listing + detail pages
│           ├── Blog/           # Blog listing + post pages
│           ├── ESGCalculator/  # 3-step ESG assessment + results
│           ├── Contact/        # Consultation booking form
│           ├── Pricing/        # Service tiers and packages
│           ├── Login/          # JWT login
│           ├── Register/       # User registration
│           ├── Dashboard/      # Client portal (protected)
│           │   ├── index.jsx   # Overview
│           │   ├── Projects.jsx
│           │   ├── Reports.jsx
│           │   ├── Consultations.jsx
│           │   └── ESGHistory.jsx
│           ├── Admin/          # Admin panel (admin-only)
│           │   ├── Dashboard.jsx
│           │   ├── Consultations.jsx
│           │   ├── Blogs.jsx
│           │   ├── CaseStudies.jsx
│           │   ├── Feedback.jsx
│           │   └── EsgResults.jsx
│           └── NotFound/       # 404 page
│
└── server/                     # Express.js backend
    └── src/
        ├── index.js            # Server entry point
        ├── app.js              # Express app setup, middleware, CORS
        ├── db/                 # MongoDB connection
        ├── models/             # Mongoose schemas
        ├── controllers/        # Route handler logic
        ├── routes/             # API route definitions
        │   ├── auth.routes.js
        │   ├── blog.routes.js
        │   ├── caseStudy.routes.js
        │   ├── consultation.routes.js
        │   ├── esg.routes.js
        │   ├── feedback.routes.js
        │   └── project.routes.js
        ├── middleware/         # JWT auth, role guards
        └── utils/              # Email helpers, validators
```

---

##  Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local) or MongoDB Atlas account
- Gmail account with App Password (for Nodemailer)

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

##  API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login and get JWT | Public |
| GET | `/api/blogs` | Get all blog posts | Public |
| GET | `/api/case-studies` | Get all case studies | Public |
| POST | `/api/consultations` | Book a consultation | Public |
| POST | `/api/esg` | Submit ESG assessment | Public |
| GET | `/api/projects` | Get client's projects | Client |
| GET | `/api/feedback` | Get all feedback | Admin |

---

##  ESG Calculator

The ESG Calculator is a standout interactive feature:

1. **Step 1 — Environmental**: Energy use, waste management, emissions
2. **Step 2 — Social**: Labor practices, community impact
3. **Step 3 — Governance**: Compliance, reporting, ethics

Output: A score out of 100 with a grade (A–D) and personalised improvement recommendations.

---

##  Authentication & Roles

| Role | Access |
|---|---|
| `guest` | Public pages, ESG calculator, contact form |
| `client` | Dashboard, projects, reports, consultations, ESG history |
| `admin` | Full admin panel — manage all platform content |

---

##  Common Issues

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

---

##  License

MIT License — free to use, modify, and distribute.

---

##  Author

**Arunabha Mukhopadhyay**
Supply Chain & Technology Enthusiast
[LinkedIn](https://linkedin.com/in/arunabhamukhopadhyay) · [GitHub](https://github.com/arunabhamukhopadhyay)

---

> Built as part of a Design Thinking Hackathon — OptiChain addresses the real problem that 67% of Indian SMEs have no formal ESG reporting and lose an estimated ₹2.3L Cr annually to supply chain inefficiencies.
