# Event Booking System — Backend

This is the backend for the Event Booking Web App, built using **Express.js**. It handles everything from authentication to event management and bookings. The API supports user roles (Admin/User) and allows image uploads for events.

---

## Tech Stack

- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **JWT** for authentication
- **Multer** for file/image uploads
- **CORS + Dotenv** for config

---

## Features

### Authentication

- User registration and login with hashed passwords (bcrypt)
- JWT-based authentication
- Role-based access control (Admin/User)

### Event Management

- Create, Read, Update, Delete events
- Admins only

### Booking System

- Authenticated users can book tickets
- Users can book multiple tickets per event — each click books one ticket

### Image Upload

- Multer is used to upload and store event images

### Utilities and Middleware

- Middleware for error asyncWrapper, authentication, role checking
- Utility functions for common logic

---

## Folder Structure

```
server/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── uploads/
├── utils/
├── index.js
├── .env
```

---

## How to Run the Project

1. **Clone the Repo**

```bash
git clone https://github.com/your-username/event-booking-system.git
cd event-booking-system/server
```

2. **Install Dependencies**

```bash
npm install
```

3. **Environment Setup**
   Create a `.env` file:

```bash
PORT=3001
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. **Run the Server**

```bash
npm run dev
```

## This will start the server using nodemon in development mode.

## 📬 API Endpoints

### Auth

- `POST /api/users/register`
- `POST /api/users/login`

### Events

- `GET /api/events` (public)
- `POST /api/events` (admin)
- `GET /api/events/:id` (public)
- `PATCH /api/events/:id` (admin)
- `DELETE /api/events/:id` (admin)

### Bookings

- `POST /api/bookings/:id` (public)
- `GET /api/bookings/:id` (public)

---

## Notes

- Ensure MongoDB is running
- Make sure uploads folder exists and is writable

---
