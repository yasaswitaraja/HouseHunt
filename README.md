# 🏠 HouseHunt  

### A modern full-stack rental property management platform built with the MERN stack.

<p align="center">
  <a href="https://house-hunt-three.vercel.app/">
    <img src="https://img.shields.io/badge/🚀%20Live%20Demo-HouseHunt-10A37F?style=for-the-badge" alt="Live Demo"/>
  </a>
  <a href="https://github.com/yasaswitaraja/HouseHunt">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub"/>
  </a>
</p>


<p align="center">
  <img src="https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-Backend-000000?style=flat-square&logo=express"/>
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/JWT-Authentication-000000?style=flat-square&logo=jsonwebtokens"/>
  <img src="https://img.shields.io/badge/Vercel-Frontend-000000?style=flat-square&logo=vercel"/>
  <img src="https://img.shields.io/badge/Render-Backend-46E3B7?style=flat-square&logo=render"/>
</p>

---

## ✨  Overview

**HouseHunt** is a full-stack rental property platform designed to simplify the process of discovering properties, managing bookings, and administering rental listings.

The application provides separate experiences for regular users and administrators, with secure authentication, property filtering, booking management, approval workflows, and a responsive dark-themed interface.

> **Search. Explore. Book. Manage.**
>
> Everything you need for a simple rental-property workflow in one application.

---

## 🌐 Live Application

### 🚀 Try HouseHunt

**Frontend:**  
https://house-hunt-three.vercel.app/

**Backend API:**  
https://househunt-backend-pli8.onrender.com/

**Source Code:**  
https://github.com/yasaswitaraja/HouseHunt

---

# 🎯 Key Features

## 👤 User Features

- 🔐 User registration and login
- 🔑 JWT-based authentication
- 🏠 Browse approved rental properties
- 🔎 Search properties by location
- 💰 Filter properties by price
- 🏢 Filter by property type
- 🛏️ Filter by number of bedrooms
- 📄 View detailed property information
- 📅 Create rental booking requests
- 📊 Track booking status
- ❌ Cancel bookings
- 🔒 Protected user routes
- 🚪 Secure logout

---

## 🛡️ Admin Features

- 📊 Admin dashboard
- 👥 View registered users
- 🏘️ Manage property listings
- ✅ Approve properties
- ❌ Reject properties
- 📅 View all bookings
- ✅ Approve booking requests
- ❌ Reject booking requests
- 🔐 Role-based admin authorization
- 📈 Platform statistics

---

# 🧠 How HouseHunt Works

```text
                    ┌──────────────────────┐
                    │      HOUSEHUNT       │
                    │   Rental Platform    │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        ┌───────────┐    ┌───────────┐    ┌───────────┐
        │   User    │    │ Property  │    │   Admin   │
        │           │    │  System   │    │ Dashboard │
        └─────┬─────┘    └─────┬─────┘    └─────┬─────┘
              │                │                │
              ▼                ▼                ▼
        ┌───────────┐    ┌───────────┐    ┌───────────┐
        │ Register  │    │  Search   │    │  Manage   │
        │   Login   │    │  Filter   │    │ Properties│
        └─────┬─────┘    └─────┬─────┘    └─────┬─────┘
              │                │                │
              └────────────┬───┴────────────────┘
                           ▼
                    ┌───────────────┐
                    │    Booking    │
                    │    System     │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │    MongoDB    │
                    │     Atlas     │
                    └───────────────┘

 System Architecture



                         INTERNET
                            │
                            ▼
                 ┌────────────────────┐
                 │      Vercel        │
                 │   React Frontend   │
                 └─────────┬──────────┘
                           │
                       REST API
                           │
                           ▼
                 ┌────────────────────┐
                 │      Render        │
                 │ Node + Express API │
                 └─────────┬──────────┘
                           │
                        Mongoose
                           │
                           ▼
                 ┌────────────────────┐
                 │   MongoDB Atlas    │
                 │    Cloud Database  │
                 └────────────────────┘


