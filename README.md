# 🌿 Arvyax Wellness Platform

A full-stack web application built using the **MERN** stack (MongoDB, Express, React, Node.js) for managing wellness sessions.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Live Demo](#-live-demo)
- [Installation](#-installation)
- [API Documentation](#-api-documentation)
- [Project Structure](#️-project-structure)
- [Screenshots](#-screenshots)
- [Author](#-author)
- [License](#-license)

## ✨ Features

- **Authentication System**
  - User registration and login with JWT-based authentication
  - Protected routes with automatic redirects
  - Secure session management

- **Session Management**
  - View all published wellness sessions on dashboard
  - Create, edit, and manage personal sessions
  - Auto-saving session editor with draft and publish modes
  - Session filtering and organization

- **User Experience**
  - Clean, responsive UI built with Tailwind CSS
  - Intuitive navigation with conditional login/logout
  - Real-time feedback and error handling

## ⚙️ Tech Stack

| **Category** | **Technology** |
|--------------|----------------|
| **Frontend** | React.js, Tailwind CSS, Vite |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JWT (JSON Web Tokens) |
| **Deployment** | Render (Backend), Netlify (Frontend) |

## 🌐 Live Demo

- **Frontend Application:** [https://wellness-platform-eight.vercel.app/](https://wellness-platform-eight.vercel.app/)
- **Backend API:** [https://wellness-platform-0lkr.onrender.com/](https://wellness-platform-0lkr.onrender.com/)

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- MongoDB database (local or cloud)

### 1. Clone the Repository

```bash
git clone https://github.com/mayurCoder2004/wellness-platform.git
cd wellness-platform
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
touch .env
```

Add the following to your `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Start the backend server:

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register a new user account | ❌ |
| `POST` | `/api/auth/login` | Login and receive JWT token | ❌ |

### Session Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/sessions` | Fetch all published sessions | ❌ |
| `GET` | `/api/my-sessions` | Get current user's sessions | ✅ |
| `GET` | `/api/my-sessions/:id` | Get specific session by ID | ✅ |
| `POST` | `/api/my-sessions/save-draft` | Save or update draft session | ✅ |
| `POST` | `/api/my-sessions/publish` | Publish a session | ✅ |

### Request/Response Examples

#### Register User
```json
// POST /api/auth/register
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Save Draft Session
```json
// POST /api/my-sessions/save-draft
{
  "title": "Morning Meditation",
  "tags": "meditation, morning, peace",
  "json_file_url": "https://example.com/session/morning-meditation.json"
}
```

## 🗂️ Project Structure

```
wellness-platform/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   └── sessionController.js  # Session management
│   ├── middleware/
│   │   └── auth.js              # JWT verification
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Session.js           # Session schema
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   └── sessions.js          # Session routes
│   ├── .env                     # Environment variables
│   ├── server.js                # Server entry point
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Navigation component
│   │   │   └── SessionCard.jsx  # Session display component
│   │   ├── pages/
│   │   │   ├── Login.jsx        # Login page
│   │   │   ├── Register.jsx     # Registration page
│   │   │   ├── Dashboard.jsx    # Main dashboard
│   │   │   ├── MySessions.jsx   # User sessions
│   │   │   └── SessionEditor.jsx # Create/edit sessions
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Global styles
│   ├── tailwind.config.js       # Tailwind configuration
│   ├── package.json
│   └── vite.config.js           # Vite configuration
│
└── README.md                    # Project documentation
```

### Implemented Pages

- ✅ **Login Page** - User authentication
- ✅ **Register Page** - Account creation
- ✅ **Dashboard Page** - Browse all published sessions
- ✅ **My Sessions Page** - Manage personal sessions (drafts and published)
- ✅ **Session Editor Page** - Create and edit sessions with auto-save
- ✅ **Navigation Bar** - Responsive navigation with conditional elements

## 🧑‍💻 Author

**Mayur Pawar**
- GitHub: [@mayurCoder2004](https://github.com/mayurCoder2004)

### Completed Requirements:
- [x] Full-stack MERN application
- [x] User authentication system
- [x] Session management functionality
- [x] Responsive UI design
- [x] Protected routes implementation
- [x] Auto-save functionality
- [x] Clean code structure and documentation

**Built with ❤️**
