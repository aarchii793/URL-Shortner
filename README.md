# URL Shortener

A full-stack URL shortening application built with the MERN stack that allows users to convert long URLs into short, shareable links.

The application supports user authentication, personalized URL management, custom short URLs, URL redirection, and click tracking through a structured frontend-backend architecture.

---

# Features

* Create short URLs from long URLs
* Generate unique short URL identifiers
* Custom URL slugs for authenticated users
* Redirect short URLs to their original destinations
* Track the number of clicks on shortened URLs
* User registration and login
* JWT-based authentication
* Cookie-based authentication handling
* Personalized user dashboard
* View all URLs created by the authenticated user
* Copy shortened URLs
* Responsive React interface
* REST API-based frontend-backend communication
* MongoDB persistence
* Centralized authentication state management
* Error handling middleware
* Modular backend architecture

The project contains dedicated authentication, URL, and user controllers along with corresponding routes, services, DAOs, middleware, models, and utility modules.

---

# Tech Stack

## Frontend

* **React.js** - Building the user interface
* **Vite** - Frontend development and build tooling
* **JavaScript / JSX** - Application logic
* **Axios** - HTTP communication with backend APIs
* **Redux Toolkit** - Authentication state management
* **TanStack Router** - Application routing
* **CSS / Tailwind CSS** - User interface styling

The frontend contains dedicated API modules, reusable components, pages, routing configuration, Redux store/slices, Axios utilities, and Vite configuration.

---

## Backend

* **Node.js** - JavaScript runtime
* **Express.js** - REST API framework
* **MongoDB** - Database
* **Mongoose** - Database modeling
* **JWT** - Authentication
* **bcrypt** - Password hashing
* **NanoID** - Unique short URL generation
* **Cookie Parser** - Cookie handling
* **CORS** - Cross-origin communication
* **dotenv** - Environment configuration

The backend is organized into configuration, controllers, DAO, middleware, routes, services, and utility layers.

---

# Architecture

```text
                         USER
                           |
                           v
                 +-------------------+
                 |     FRONTEND      |
                 | React + Vite      |
                 +---------+---------+
                           |
                      Axios / API
                           |
                           v
                 +-------------------+
                 |      BACKEND      |
                 | Node + Express    |
                 +---------+---------+
                           |
              +------------+------------+
              |                         |
              v                         v
      +---------------+         +---------------+
      | Authentication|         | URL Management|
      | JWT + Cookie  |         | Short URLs    |
      +-------+-------+         +-------+-------+
              |                         |
              +------------+------------+
                           |
                           v
                    +-------------+
                    |   MongoDB   |
                    | Users + URLs|
                    +-------------+
```

---

# Project Structure

```text
URL-Shortner/
|
├── .env
|
├── Backend/
│   ├── app.js
│   │
│   └── src/
│       ├── config/
│       │   ├── config.js
│       │   ├── mongoconfig.js
│       │   └── models/
│       │       ├── shortUrlmodel.js
│       │       └── user.model.js
│       │
│       ├── controller/
│       │   ├── auth.controller.js
│       │   ├── shortUrl.controller.js
│       │   └── user.controller.js
│       │
│       ├── dao/
│       │   ├── short_url.js
│       │   └── user.dao.js
│       │
│       ├── middleware/
│       │   └── auth.middleware.js
│       │
│       ├── routes/
│       │   ├── auth.routes.js
│       │   ├── shortUrlroute.js
│       │   └── user.route.js
│       │
│       ├── services/
│       │   ├── auth.services.js
│       │   └── shortUrl.service.js
│       │
│       └── utils/
│           ├── attachUser.js
│           ├── errorHandler.js
│           ├── gravatar.js
│           ├── helper.js
│           └── tryCatchWrapper.js
│
├── my-project/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   │
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       ├── main.jsx
│       │
│       ├── api/
│       │   ├── shortUrlapi.js
│       │   └── user.api.js
│       │
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── UrlForm.jsx
│       │   ├── loginForm.jsx
│       │   ├── registerForm.jsx
│       │   └── userUrls.jsx
│       │
│       ├── pages/
│       │   ├── AuthPage.jsx
│       │   ├── Dashboard.jsx
│       │   └── HomePage.jsx
│       │
│       ├── routing/
│       │   ├── auth.route.js
│       │   ├── dashboard.js
│       │   ├── homepage.js
│       │   ├── routeTree.js
│       │   └── routing.js
│       │
│       ├── store/
│       │   ├── slice/
│       │   │   └── authSlice.js
│       │   └── store.js
│       │
│       └── utils/
│           ├── axiosInstance.js
│           └── helper.js
│
└── README.md
```

The uploaded source tree confirms this separation between backend modules and the Vite/React frontend.

---

# How It Works

The application follows a client-server architecture.

```text
User
 |
 v
React Frontend
 |
 | HTTP Request
 v
Express API
 |
 v
Authentication Middleware
 |
 v
Controller
 |
 v
Service Layer
 |
 v
DAO
 |
 v
MongoDB
 |
 v
API Response
 |
 v
React UI
```

This layered architecture separates responsibilities between controllers, services, database-access objects, models, routes, and middleware.

---

# URL Shortening Flow

The core workflow is:

```text
                LONG URL
                    |
                    v
             URL Form
                    |
                    v
             POST API Request
                    |
                    v
          Short URL Controller
                    |
                    v
           Short URL Service
                    |
                    v
              Generate ID
                    |
                    v
             Save to MongoDB
                    |
                    v
            Short URL Created
                    |
                    v
          Return Shortened URL
```

A generated identifier is associated with the original URL and stored in the database.

---

# Short URL Generation

The application uses a unique identifier for shortened links.

```text
Original URL
     |
     v
Generate Unique ID
     |
     v
Short URL
```

For example:

```text
Original:

https://www.example.com/products/category/item/details
```

can become:

```text
https://your-domain.com/aB92xK
```

The project contains NanoID-related tooling in its installed dependencies and uses a dedicated short URL model and service layer.

---

# Custom Short URLs

Authenticated users can create personalized short URL slugs.

```text
User
 |
Enter Long URL
 |
Enter Custom Slug
 |
API Request
 |
Validate Slug
 |
Save URL
 |
Return Custom Short URL
```

Example:

```text
https://your-domain.com/portfolio
```

instead of an automatically generated identifier.

---

# URL Redirection

When someone opens a shortened URL:

```text
User clicks Short URL
        |
        v
Express Route
        |
        v
Find Short URL
        |
        v
Retrieve Original URL
        |
        v
Increment Click Count
        |
        v
Redirect User
        |
        v
Original Website
```

This allows the short link to act as a lightweight redirect layer between the user and the original destination.

---

# Click Tracking

The application maintains click information for shortened URLs.

```text
Short URL
    |
    v
User Opens Link
    |
    v
Find URL Record
    |
    v
Increase Click Count
    |
    v
Redirect to Original URL
```

Authenticated users can view their URL records and associated click information through the dashboard.

---

# Authentication

The application provides user authentication through registration and login.

```text
              AUTHENTICATION
                    |
          +---------+---------+
          |                   |
          v                   v
       Register             Login
          |                   |
          v                   v
      User Data          Credentials
          |                   |
          +---------+---------+
                    |
                    v
             Authentication
                    |
                    v
              JWT / Cookie
                    |
                    v
          Protected Resources
```

The backend includes a dedicated authentication controller, authentication service, authentication routes, and authentication middleware.

---

# Registration Flow

```text
User
 |
Register Form
 |
User Details
 |
POST / Register API
 |
Auth Controller
 |
Auth Service
 |
Hash Password
 |
Create User
 |
MongoDB
 |
Authentication Response
```

The frontend contains a dedicated `registerForm.jsx`, while authentication logic is separated on the backend.

---

# Login Flow

```text
User
 |
Login Form
 |
Email + Password
 |
Login API
 |
Auth Controller
 |
Verify Credentials
 |
Generate JWT
 |
Set Authentication Cookie
 |
Authenticated User
 |
Dashboard
```

The frontend stores authentication state through the Redux store and `authSlice`.

---

# Protected Routes

Protected operations use authentication middleware.

```text
Frontend Request
       |
       v
Authentication Cookie / Token
       |
       v
auth.middleware.js
       |
       +---- Invalid ----> Unauthorized
       |
       v
Authenticated User
       |
       v
Controller
       |
       v
Protected Resource
```

The backend contains a dedicated `auth.middleware.js` file for this purpose.

---

# User Dashboard

Authenticated users can access a dashboard containing their shortened URLs.

```text
                 Dashboard
                     |
          +----------+----------+
          |                     |
          v                     v
       Create URL           My URLs
          |                     |
          v                     v
      UrlForm.jsx          userUrls.jsx
                                |
                   +------------+------------+
                   |            |            |
                   v            v            v
                Full URL    Short URL     Clicks
```

The frontend explicitly contains `Dashboard.jsx`, `UrlForm.jsx`, and `userUrls.jsx` components.

---

# Frontend Architecture

The React application is organized into several layers.

```text
Frontend
   |
   +---- Pages
   |
   +---- Components
   |
   +---- API
   |
   +---- Routing
   |
   +---- Redux Store
   |
   +---- Utilities
```

---

## Pages

| Page            | Purpose                            |
| --------------- | ---------------------------------- |
| `HomePage.jsx`  | Main URL shortening interface      |
| `AuthPage.jsx`  | Authentication interface           |
| `Dashboard.jsx` | Authenticated user's URL dashboard |

These pages are present in the uploaded frontend structure.

---

# Components

Reusable components include:

```text
components/
├── Navbar.jsx
├── UrlForm.jsx
├── loginForm.jsx
├── registerForm.jsx
└── userUrls.jsx
```

### Navbar

Provides application navigation and authentication-related navigation.

### UrlForm

Handles URL input and short URL creation.

### LoginForm

Handles user login.

### RegisterForm

Handles user registration.

### UserUrls

Displays URLs created by the authenticated user.

The complete component structure is present in the project source.

---

# API Layer

Frontend API communication is separated into dedicated modules:

```text
api/
├── shortUrlapi.js
└── user.api.js
```

This prevents API logic from being tightly coupled with UI components.

---

# Axios Configuration

The project contains a centralized Axios configuration:

```text
utils/
└── axiosInstance.js
```

This provides a reusable HTTP client for communicating with the backend APIs.

---

# State Management

Authentication state is managed using Redux.

```text
Redux Store
     |
     v
authSlice
     |
     +---- User
     |
     +---- Authentication State
     |
     +---- Login
     |
     +---- Logout
```

The project contains:

```text
store/
├── store.js
└── slice/
    └── authSlice.js
```

---

# Routing

Frontend routes are organized separately:

```text
routing/
├── auth.route.js
├── dashboard.js
├── homepage.js
├── routeTree.js
└── routing.js
```

This keeps route configuration separate from page components.

---

# Backend Architecture

The backend follows a layered architecture:

```text
                Express Server
                      |
                    Routes
                      |
                 Middleware
                      |
                 Controllers
                      |
                  Services
                      |
                    DAO
                      |
                   Models
                      |
                  MongoDB
```

---

# Backend Configuration

```text
config/
├── config.js
├── mongoconfig.js
└── models/
    ├── shortUrlmodel.js
    └── user.model.js
```

The configuration layer handles application configuration and database connectivity, while the models represent users and shortened URLs.

---

# Controllers

Controllers handle incoming HTTP requests.

```text
controller/
├── auth.controller.js
├── shortUrl.controller.js
└── user.controller.js
```

Responsibilities include:

* Authentication requests
* Short URL creation
* URL redirection
* User-related requests
* URL retrieval and management

---

# Service Layer

Business logic is separated into services:

```text
services/
├── auth.services.js
└── shortUrl.service.js
```

The service layer allows controllers to remain focused on handling HTTP requests while application logic is handled separately.

---

# DAO Layer

Database-access operations are separated into DAO modules:

```text
dao/
├── short_url.js
└── user.dao.js
```

This provides an additional abstraction between business logic and MongoDB operations.

---

# Database Models

The project uses separate models for:

```text
models/
├── shortUrlmodel.js
└── user.model.js
```

### User Model

Stores user-related information required for authentication and user management.

### Short URL Model

Stores URL mappings and information associated with shortened links.

---

# Error Handling

The backend contains dedicated utility modules for error management:

```text
utils/
├── errorHandler.js
└── tryCatchWrapper.js
```

This supports centralized error handling and reduces repetitive error-management code across controllers.

---

# Complete Application Flow

```text
                         USER
                           |
                           v
                    React Frontend
                           |
            +--------------+--------------+
            |              |              |
            v              v              v
         Register         Login       Shorten URL
            |              |              |
            v              v              v
      Authentication     JWT/Cookie    URL API
                           |              |
                           |              v
                           |        Short URL Service
                           |              |
                           |              v
                           |             DAO
                           |              |
                           |              v
                           |           MongoDB
                           |              |
                           |              v
                           |       Short URL Response
                           |              |
                           +--------------+
                                          |
                                          v
                                      Dashboard
                                          |
                            +-------------+-------------+
                            |                           |
                            v                           v
                       My URLs                    Click Analytics
                            |
                            v
                      Short URL
                            |
                            v
                       Redirect
                            |
                            v
                    Original Website
```

---

# Installation

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/URL-Shortner.git
```

Navigate into the project:

```bash
cd URL-Shortner
```

---

# 2. Install Backend Dependencies

```bash
cd Backend
npm install
```

---

# 3. Install Frontend Dependencies

Open another terminal:

```bash
cd my-project
npm install
```

---

# Environment Variables

The project contains an environment configuration file at the root level.

Create/configure your local `.env` file with the variables required by the backend.

Example:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Use the exact variable names expected by your implementation.

Do not commit real credentials, database connection strings, or JWT secrets to GitHub.

---

# Running the Application

## Start Backend

From the backend directory:

```bash
npm start
```

For development with Nodemon, if configured:

```bash
npm run dev
```

The backend entry point is:

```text
Backend/
└── app.js
```

---

## Start Frontend

From the frontend directory:

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

---

# API Overview

The application is organized around three primary API areas.

## Authentication

```text
Authentication
|
+---- Register
|
+---- Login
|
└---- Logout / Session Management
```

---

## Short URLs

```text
Short URL
|
+---- Create Short URL
|
+---- Generate Identifier
|
+---- Redirect
|
└---- Track Clicks
```

---

## Users

```text
Users
|
+---- Get Current User
|
└---- Get User URLs
```

The backend contains dedicated authentication, short URL, and user routes.

---

# Security

The application implements several security-related mechanisms:

* JWT authentication
* Authentication middleware
* Password hashing
* HTTP cookies for authentication handling
* Environment variables for secrets
* CORS configuration
* Protected user-specific operations

The backend structure contains authentication middleware, user models, authentication controllers/services, and supporting utilities.

---

# Key Learning Outcomes

This project provides hands-on experience with:

* Full-stack MERN development
* React.js
* Vite
* Node.js
* Express.js
* MongoDB
* Mongoose
* REST API development
* URL shortening algorithms
* Unique ID generation
* URL redirection
* Click tracking
* JWT authentication
* Cookie-based authentication
* Password hashing
* Redux Toolkit
* Axios
* Frontend routing
* MVC-style backend organization
* Service-layer architecture
* DAO pattern
* Middleware
* Error handling
* Frontend-backend integration

---


---


