# Task API (Backend + Frontend)

A scalable Todo management application built with **NestJS + MongoDB + JWT Authentication + RBAC** and a responsive **React UI**.

This project demonstrates secure backend architecture, role-based access control, and protected frontend integration.

---

## ✨ Features

### 🔐 Authentication

* User Register & Login
* Password hashing (bcrypt)
* JWT authentication
* Protected APIs

### 👥 Role Based Access Control (RBAC)

* User vs Admin roles
* Admin-only endpoints (delete, stats)
* Guard-based authorization

### ✅ Todo Module

* Create / Read / Update / Delete
* Pagination
* Search & filter
* Status toggle
* Stats endpoint

### 🎨 Frontend

* Responsive login & register UI
* Protected dashboard
* CRUD integration
* Toast notifications
* Logout support

---

## 🧱 Tech Stack

**Backend**

* NestJS
* MongoDB (Mongoose)
* JWT
* Swagger

**Frontend**

* React
* Axios
* TailwindCSS
* Framer Motion

---

## 📁 Project Structure

```
backend/
 ├ auth/
 ├ users/
 ├ todo/
 ├ common/
 └ main.ts

frontend/
 ├ pages/
 ├ components/
 ├ api.js
 └ App.jsx
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone repo

```
git clone <repo-link>
```

---

### 2️⃣ Backend setup

```
cd backend
npm install
```

Create `.env`

```
MONGO_URI=
JWT_SECRET=
PORT=5000
```

Run:

```
npm run start:dev
```

---

### 3️⃣ Frontend setup

```
cd frontend
npm install
npm run dev
```

---

## 🔑 API Overview

### Auth

* POST `/v1/auth/register`
* POST `/v1/auth/login`

### Todo

* GET `/v1/todo/findAll`
* POST `/v1/todo/create`
* PUT `/v1/todo/updateTodo/:id`
* DELETE `/v1/todo/deleteTodo/:id`
* PUT `/v1/todo/updateStatus/:id`
* GET `/v1/todo/search`
* GET `/v1/todo/filter`
* GET `/v1/todo/stats`

Swagger available at:

```
/api/docs
```

---

## 🔒 Security Practices

* JWT protected routes
* Role guards
* Input validation
* Password hashing
* Ownership check (user can modify own todos)

---

## 📈 Scalability Notes

This project uses a modular NestJS architecture enabling future scalability:

* Modules can be extracted into microservices
* Redis caching can be added for stats
* Horizontal scaling via load balancer
* Docker deployment ready
* Database indexing for search optimization

---

## 👨‍💻 Author

**Manish Kumawat**

Full Stack Developer Technical Assessment
