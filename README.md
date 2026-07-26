# 🏙️ CityPulse | القليوبية

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=node.js&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=flat-square&logo=leaflet&logoColor=white)

**Smart Municipal Issue Reporting & Management System**<br/>
*Qalyubia Governorate, Egypt 🇪🇬*

[📋 Features](#-features) · [🛠️ Tech Stack](#-tech-stack) · [📡 API](#-api-endpoints) · [🚀 Getting Started](#-getting-started) · [📸 Screenshots](#-screenshots)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [API Endpoints](#-api-endpoints)
- [Design System](#-design-system)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)
- [Screenshots](#-screenshots)
- [Contributors](#-contributors)

---

## 📌 Overview

| Attribute | Value |
|-----------|-------|
| **Project Type** | Municipal Issue Reporting & Management System |
| **Governorate** | Qalyubia (القليوبية) |
| **Tech Stack** | MERN (MongoDB, Express, React, Node.js) |
| **Language** | Arabic (RTL) with full Unicode support |
| **Authentication** | JWT with auto-invalidation on password change |
| **File Storage** | Cloudinary CDN |
| **Maps** | Leaflet + OpenStreetMap |

---

## ✨ Features

### 👤 Citizen Portal
- 📝 **Report Submission Wizard** — 3-step guided form (Location → Details → Review)
- 📸 **Image Upload** — Up to 5 photos with drag-and-drop, auto-resize (1000px), Cloudinary CDN delivery
- 📊 **Personal Dashboard** — Real-time statistics (total, resolved, in-progress), progress bars per report
- ⭐ **Service Rating** — Rate resolved reports (1-5 stars) with optional feedback comments
- 👤 **Profile Management** — Update personal info, change password with automatic logout on all devices
- 📱 **Fully Responsive** — Mobile-first design optimized for citizen accessibility

### 🛠️ Admin Dashboard
- 📈 **Statistics** — Total, open, in-progress, closed reports with completion rate percentage
- 📋 **Advanced Reports Table** — Full CRUD with multi-filter (status, category, priority, district, department), search, pagination (10/25/50 per page)
- 🔄 **Status Workflow** — `Open → Assigned → In Progress → Fixed → Closed` with department assignment dropdown
- 📥 **CSV Export** — One-click export with Arabic BOM encoding for proper Excel rendering
- 🗑️ **Delete Confirmation** — Beautiful modal dialog preventing accidental deletions
- 🗺️ **Heatmap Visualization** — Color-coded risk polygons per district with interactive tooltips and time-range filters (24h, 7d, all)
- 🔗 **Report Clustering** — Intelligent merging of similar reports (same category, within 100m) using Haversine formula with automatic priority recalculation
- 📊 **Analytics Dashboard** — Donut chart (categories), area chart (reports over time), bar chart (status distribution), performance table (districts)
- 👥 **User Management** — View all users, search, toggle active/disabled status with confirmation modal
- 🌙 **Dark Admin Sidebar** — Professional dark-themed navigation with role-based access

---

## 🧰 Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js 20** | JavaScript runtime |
| **Express.js** | Web framework |
| **MongoDB + Mongoose** | Database & ODM |
| **JWT (jsonwebtoken)** | Authentication tokens |
| **bcryptjs** | Password hashing (12 rounds) |
| **Multer + Cloudinary** | File upload & CDN storage |
| **Helmet** | HTTP security headers |
| **express-mongo-sanitize** | NoSQL injection prevention |
| **express-rate-limit** | Rate limiting (100 req/15min) |
| **cors** | Cross-Origin Resource Sharing |
| **express-validator** | Input validation & sanitization |
| **axios** | HTTP client for external APIs |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI library |
| **Vite 5** | Build tool & dev server |
| **Tailwind CSS 3** | Utility-first styling |
| **React Router v6** | Client-side routing with nested layouts |
| **Axios** | HTTP client with interceptors |
| **react-leaflet + leaflet** | Interactive maps & heatmap |
| **react-icons** | Icon library (Feather Icons set) |
| **@mui/material + @mui/icons-material** | Material Design components & icons (admin panel) |
| **recharts** | Charts & data visualization |
| **date-fns** | Date formatting & manipulation |

---

## 🏗️ Architecture

### Backend Structure

```
backend/
├── config/        # Database connection
├── controllers/    # Request handlers (auth, report, admin, clustering, heatmap, riskIndex)
├── middleware/      # Auth (JWT), Role-based access, File upload
├── models/          # Mongoose schemas (User, Report)
├── routes/          # Express route definitions
├── services/        # Business logic (priority, clustering, riskIndex)
├── utils/           # Helpers (AppError, priorityScore, validation)
└── server.js         # Entry point
```

### Frontend Structure

```
frontend/src/
├── api/              # Axios instance & API service objects
├── components/       # Reusable components
│   ├── analytics/    # Chart widgets (Donut, Line, Bar, Table)
│   ├── common/       # Shared (Navbar, Sidebar, UserSidebar, Settings)
│   ├── layout/       # AdminLayout with nested routes
│   ├── map/          # HeatMap, AreaInfoCard, MapLegend, LocationMap
│   └── reports/      # ReportsTable, ReportDetailContent
├── context/          # AuthProvider (React Context API)
├── pages/            # Route pages
│   ├── admin/        # AdminDashboard, AllReports, HeatMap, Clustering, Users, Analytics
│   └── ...           # Landing, Login, Register, UserDashboard, ReportForm, TrackReport
├── routes/           # ProtectedRoute, AdminRoute
├── utils/            # reportDisplay, constants
└── App.js            # Root component with router
```

### Key Design Patterns
- **Service Layer**: Business logic separated from controllers (Priority, Clustering, Risk Index)
- **Custom Error Class**: `AppError` with `isOperational` flag for global error handling
- **Token Invalidation**: Password change auto-invalidates all existing tokens via `passwordChangedAt` check
- **Interceptor Pattern**: Axios interceptors for automatic token attachment and 401 redirect handling

---

## 📡 API Endpoints

### 🔐 Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | ❌ | Register new citizen account |
| `POST` | `/api/auth/login` | ❌ | Login (returns JWT + user data) |
| `GET` | `/api/auth/me` | ✅ | Get current user profile |
| `PATCH` | `/api/auth/update-me` | ✅ | Update name/phone |
| `PATCH` | `/api/auth/update-password` | ✅ | Change password (invalidates old tokens) |
| `POST` | `/api/auth/logout` | ✅ | Logout |

### 📝 Reports (User)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/reports` | ✅ | Submit new report (multipart/form-data) |
| `GET` | `/api/reports/my-reports` | ✅ | Get user's reports |
| `GET` | `/api/reports/:id` | ✅ | Get report details (owner or admin only) |
| `DELETE` | `/api/reports/:id` | ✅ | Delete report (owner + Open status only) |
| `PATCH` | `/api/reports/:id/rate` | ✅ | Rate resolved report (1-5 stars) |

### 👨‍💼 Admin
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/admin/dashboard/stats` | Admin | Dashboard statistics |
| `GET` | `/api/admin/reports` | Admin | All reports (paginated, filterable) |
| `GET` | `/api/admin/reports/:id` | Admin | Report full details |
| `PATCH` | `/api/admin/reports/:id/status` | Admin | Update status with flow validation |
| `PATCH` | `/api/admin/reports/:id/assign` | Admin | Assign to department |
| `DELETE` | `/api/admin/reports/:id` | Admin | Delete any report |
| `GET` | `/api/admin/analytics` | Admin | Charts data (time series + status distribution) |
| `GET` | `/api/admin/users` | Admin | All users list |
| `PATCH` | `/api/admin/users/:id/status` | Admin | Toggle user active/disabled |

### 🗺️ Specialized
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/heatmap/data` | Admin | District risk data with optional `?timeRange=24h,7d,all` |
| `POST` | `/api/clustering/run` | Admin | Execute clustering algorithm |
| `GET` | `/api/risk-index` | Admin | All districts risk scores |
| `GET` | `/api/risk-index/:district` | Admin | Single district risk details |

---

## 🎨 Design System

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#0d9488` | Buttons, active states, links |
| `--color-primary-dark` | `#0f766e` | Hover states |
| `--color-primary-light` | `#14b8a6` | Accents |
| Background | `#F8FAFC` | Page background |
| Card | `#FFFFFF` | Cards, tables |
| Text Primary | `#1e293b` | Headings |
| Text Secondary | `#64748b` | Descriptions, labels |
| Danger | `#EF4444` | Delete buttons, errors |
| Success | `#10B981` | Resolved status, confirmations |
| Warning | `#F59E0B` | Pending status, alerts |
| Info | `#3B82F6` | Open status |

### Risk Level Colors (Heatmap)
| Level | Hex | Opacity | Label (AR) |
|-------|-----|---------|------------|
| Critical | `#DC2626` | 0.6 | حرج جداً |
| High | `#D97706` | 0.5 | مرتفع |
| Medium | `#EAB308` | 0.4 | متوسط |
| Low | `#16A34A` | 0.3 | منخفض |
| Safe | `#0d9488` | 0.2 | آمن |

### Typography
- **Font**: Cairo (sans-serif)
- **Direction**: RTL (Right-to-Left) — Full Arabic support
- **Weights**: 400 (regular), 700 (bold), 900 (black)

---

## ⚙️ Environment Variables

Create `.env` files in both `backend/` and `frontend/` directories:

### Backend (`backend/.env`)

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/citypulse
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=12
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18.x
- MongoDB ≥ 6.x (local or Atlas)
- Cloudinary Account (free tier) for image uploads
- npm ≥ 9.x

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/citypulse.git
cd citypulse

# 2. Backend setup
cd backend
npm install
cp .env.example .env    # Edit with your values
node server.js          # Starts on http://localhost:5000

# 3. Frontend setup
cd ../frontend
npm install
cp .env.example .env    # Edit with your values
npm run dev              # Starts on http://localhost:5173
```

### Default Admin Account
| Field | Value |
|-------|-------|
| Email | admin@citypulse.com |
| Password | admin123 |

⚠️ **Change default credentials immediately after first login!**

---

## 📸 Screenshots

<div align="center">
  <img src="./frontend/public/screenshots/p1.jpeg" alt="Screenshot 1" width="400"/>
  <img src="./frontend/public/screenshots/p2.jpeg" alt="Screenshot 2" width="400"/>
  <br/>
  <img src="./frontend/public/screenshots/p3.jpeg" alt="Screenshot 3" width="400"/>
  <img src="./frontend/public/screenshots/p4.jpeg" alt="Screenshot 4" width="400"/>
  <br/>
  <img src="./frontend/public/screenshots/p5.jpeg" alt="Screenshot 5" width="400"/>
  <img src="./frontend/public/screenshots/p6.jpeg" alt="Screenshot 6" width="400"/>
  <br/>
  <img src="./frontend/public/screenshots/p7.jpeg" alt="Screenshot 7" width="400"/>
  <img src="./frontend/public/screenshots/p8.jpeg" alt="Screenshot 8" width="400"/>
  <br/>
  <img src="./frontend/public/screenshots/p9.jpeg" alt="Screenshot 9" width="400"/>
  <img src="./frontend/public/screenshots/p10.jpeg" alt="Screenshot 10" width="400"/>
</div>

---

## 👥 Contributors

| Name | Role |
|------|------|
| Mai Mohamed | Team Leader & Full Stack Developer |
| Asmaa AbdelKader | Frontend Developer |
| Yehya Mostafa | Frontend Developer |
| Salma Sharaawy | Frontend Developer |
| Malak Allam | Frontend Developer |
| Noran Wael | Frontend Developer |

<div align="center">

Made with ❤️ for Qalyubia Governorate


</div>