# HouseHunt 
  
### Full-Stack Rental Property Management Platform

HouseHunt is a full-stack rental property management platform built using the MERN stack. It provides a structured workflow for property discovery, filtering, booking requests, authentication, and administrative management.

<p align="center">
  <a href="https://house-hunt-three.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-HouseHunt-000000?style=for-the-badge" />
  </a>
  <a href="https://github.com/yasaswitaraja/HouseHunt">
    <img src="https://img.shields.io/badge/Source%20Code-GitHub-181717?style=for-the-badge&logo=github" />
  </a>
</p>
 
---
 
## Live Application

**Frontend:**
https://house-hunt-three.vercel.app/

**Backend API:**
https://househunt-backend-pli8.onrender.com/

**Repository:**
https://github.com/yasaswitaraja/HouseHunt

---

## Overview

HouseHunt follows a client-server architecture where a React frontend communicates with a Node.js and Express backend through REST APIs.

The backend handles authentication, authorization, property management, and booking workflows, while MongoDB Atlas provides persistent cloud storage.

The application supports two primary roles:

* **User** — browse properties, search and filter listings, view property details, and submit booking requests.
* **Administrator** — manage users, properties, bookings, approvals, and platform information.

---

# System Architecture
 
```text
                         CLIENT
                           |
                           |
                           v
                +---------------------+
                |       Vercel        |
                |    React Frontend   |
                +----------+----------+
                           |
                           | REST API
                           | HTTP / JSON
                           v
                +---------------------+
                |       Render        |
                |  Node.js + Express  |
                +----------+----------+
                           |
                           | Mongoose
                           v
                +---------------------+
                |    MongoDB Atlas    |
                |    Cloud Database   |
                +---------------------+
```

### Architecture Flow

```text
User
  |
  v
React UI
  |
  v
Axios / HTTP Request
  |
  v
Express REST API
  |
  +---- Authentication
  |
  +---- Authorization
  |
  +---- Property Management
  |
  +---- Booking Management
  |
  v
Mongoose
  |
  v
MongoDB Atlas
  |
  v
JSON Response
  |
  v
React UI
```

---

# Technology Stack

## Frontend

| Technology      | Purpose             |
| --------------- | ------------------- |
| React 18        | User interface      |
| JavaScript      | Application logic   |
| React Router    | Client-side routing |
| Axios           | API communication   |
| Bootstrap / CSS | Responsive UI       |

## Backend

| Technology | Purpose            |
| ---------- | ------------------ |
| Node.js    | JavaScript runtime |
| Express.js | REST API framework |
| Mongoose   | MongoDB ODM        |
| JWT        | Authentication     |
| bcrypt     | Password hashing   |

## Database

| Technology    | Purpose                |
| ------------- | ---------------------- |
| MongoDB       | Application database   |
| MongoDB Atlas | Cloud database hosting |

## Deployment

| Service       | Component                 |
| ------------- | ------------------------- |
| Vercel        | React frontend            |
| Render        | Node.js / Express backend |
| MongoDB Atlas | Database                  |

---

# Core Features

## User Features

* User registration and login
* JWT-based authentication
* Protected routes
* Property discovery
* Location-based search
* Price filtering
* Property-type filtering
* Bedroom filtering
* Property detail pages
* Booking requests
* Booking status tracking
* Booking cancellation
* Secure logout

## Administrative Features

* Administrative dashboard
* User management
* Property listing management
* Property approval and rejection
* Booking management
* Booking approval and rejection
* Role-based authorization
* Platform statistics

---

# Authentication Architecture

HouseHunt uses JWT-based authentication to protect authenticated resources.

```text
                User
                 |
                 v
          Login / Register
                 |
                 v
          Express Backend
                 |
                 v
       Validate Credentials
                 |
                 v
          Generate JWT
                 |
                 v
          Client Storage
                 |
                 v
     Authenticated API Requests
                 |
                 v
       Authentication Middleware
                 |
                 v
          Protected Route
```

Passwords are hashed using bcrypt rather than being stored as plain text.

JWT middleware is used to verify authenticated requests before allowing access to protected resources.

---

# Role-Based Authorization

The application separates user and administrative functionality.

```text
                    Authenticated User
                           |
                           v
                     JWT Validation
                           |
                           v
                    Check User Role
                           |
              +------------+------------+
              |                         |
              v                         v
            USER                       ADMIN
              |                         |
              v                         v
       User Operations          Admin Operations
              |                         |
       Browse Properties        Manage Users
       Search / Filter          Manage Properties
       Create Booking           Approve Listings
       Track Booking            Manage Bookings
                                 View Statistics
```

This prevents regular users from accessing administrative operations.

---

# Property Management Workflow

```text
              Property Listing
                     |
                     v
              Submit Property
                     |
                     v
             Administrative Review
                     |
             +-------+-------+
             |               |
             v               v
          Approved         Rejected
             |
             v
      Available to Users
             |
             v
       Search / Filter
             |
             v
       View Property
             |
             v
       Booking Request
```

---

# Booking Workflow

```text
User
 |
 | Select Property
 v
Property Details
 |
 | Submit Booking
 v
Booking Request
 |
 v
Admin Review
 |
 +-------------------+
 |                   |
 v                   v
Approved           Rejected
 |                   |
 v                   v
Booking Status     Status Updated
Updated
```

---

# Database Architecture

The primary application entities are users, properties, and bookings.

```text
                    MongoDB Atlas
                         |
          +--------------+--------------+
          |              |              |
          v              v              v
       Users         Properties      Bookings
          |              |              |
          |              |              |
          +--------------+--------------+
                         |
                    Relationships
```

### User

```text
User
├── name
├── email
├── password
└── role
```

### Property

```text
Property
├── title
├── location
├── price
├── propertyType
├── bedrooms
├── description
└── status
```

### Booking

```text
Booking
├── user
├── property
├── status
└── booking information
```

---

# API Communication

The frontend communicates with the backend through REST APIs.

```text
React Component
      |
      v
     Axios
      |
      v
Express Route
      |
      v
Controller / Business Logic
      |
      v
Mongoose Model
      |
      v
MongoDB Atlas
      |
      v
JSON Response
      |
      v
React State / UI
```

This separation allows the frontend and backend to be developed, deployed, and maintained independently.

---

# Project Structure

```text
HouseHunt/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── assets/
│       ├── App.jsx
│       └── main.jsx
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
├── .gitignore
└── README.md
```

---

# Deployment Architecture

The application is deployed using separate services for each layer.

```text
                       Internet
                           |
                           v
                    +-------------+
                    |   Vercel    |
                    |   Frontend  |
                    +------+------+
                           |
                        REST API
                           |
                           v
                    +-------------+
                    |   Render    |
                    |   Backend   |
                    +------+------+
                           |
                       Mongoose
                           |
                           v
                    +-------------+
                    |  MongoDB    |
                    |    Atlas    |
                    +-------------+
```

This deployment model separates the presentation layer, application layer, and database layer.

---

# Local Development

## Clone the Repository

```bash
git clone https://github.com/yasaswitaraja/HouseHunt.git

cd HouseHunt
```

## Install Frontend Dependencies

```bash
cd frontend
npm install
```

## Install Backend Dependencies

```bash
cd ../backend
npm install
```

## Environment Variables

Create a `.env` file inside the backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not commit `.env` files or credentials to the repository.

## Run the Backend

```bash
cd backend
npm run dev
```

## Run the Frontend

```bash
cd frontend
npm run dev
```

---

# Security Considerations

The application implements several common web application security practices:

* JWT-based authentication
* Password hashing using bcrypt
* Protected API routes
* Role-based authorization
* Environment variables for sensitive configuration
* Separation of frontend and backend services

---

# Future Improvements

Potential future enhancements include:

* Online payment integration
* Property image storage using cloud storage
* Interactive maps
* Saved / favorite properties
* Real-time notifications
* Property reviews and ratings
* User-property messaging
* Advanced analytics dashboard
* Improved mobile responsiveness

---

# Project Purpose

HouseHunt was developed to gain practical experience in full-stack web development and to understand how modern web applications connect frontend interfaces, backend APIs, authentication systems, databases, and cloud deployment.

The project demonstrates experience with:

```text
Frontend Development
        ↓
REST API Development
        ↓
Authentication & Authorization
        ↓
Database Integration
        ↓
CRUD Operations
        ↓
Cloud Deployment
```

---

# Author

**Yasaswita Raja**

B.Tech — Artificial Intelligence & Data Science

GitHub:
https://github.com/yasaswitaraja

LinkedIn:
https://www.linkedin.com/in/yasaswita-raja/

---

<p align="center">
  <strong>HouseHunt</strong><br>
  Full-Stack Rental Property Management Platform
</p>
