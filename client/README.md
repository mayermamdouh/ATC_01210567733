# Event Booking System — Frontend

This is the frontend for a full-stack event booking web app. Users can browse events, book tickets, and admins can manage everything from an internal panel. It's built using **React.js** and **Vite**, with **Tailwind CSS**, **Material UI**, and supports multiple languages.

---

## Tech Stack

- **React + Vite** for fast frontend development
- **Tailwind CSS + MUI** for styling and UI components
- **React Router DOM v7** for routing
- **Axios** for API calls
- **i18next** for translation
- **jwt-decode** to handle user authentication
- **React Icons** for iconography
- **ESLint** to keep the code clean

---

## Main Features

### Authentication

- Users can sign up and log in
- Each user has a role (Admin or regular user)
- Authentication uses JWT stored on the client

### Home Page

- Lists all events in a responsive flex
- Shows "Booked" label if a user already booked that event
- Otherwise, shows a "Book Now" button

### Event Details

- Full details of the event: name, description, category, date, venue, price , tags, and image
- Users can book a ticket with one click
- Successful bookings redirect to a confirmation page

### Admin Panel

- Admins can create, update, and delete events
- Only visible to users with an admin role
- Located within the same frontend app

### Multi-language Support

- Switch between English and Arabic using a simple language toggle

---

## Folder Structure

```
client/
├── public/
├── src/
│   ├── Auth/
│   ├── components/
│   ├── adminPages/
│   ├── context/
│   ├── locales/
│   ├── userPages/
│   ├── i18n.js
│   ├── App.jsx
│   └── main.jsx
├── eslint.config.js
└── vite.config.js
└── .env
```

---

## How to Run the Project

1. **Clone the Repo**

```bash
git clone https://github.com/mayermamdouh/ATC_01210567733.git
cd ATC_01210567733/client
```

2. **Install Dependencies**

```bash
npm install
```

3. **Start the Dev Server**

```bash
npm run dev
```

4. **Build for Production**

```bash
npm run build
```

5. **Preview the Build**

```bash
npm run preview
```

---

## 🌍 Environment Variables

Create a `.env` file in the root directory and add:

```bash
VITE_API_URL=http://localhost:3001
```

---

## Notes

- This frontend is built to work with an Express.js backend
- Roles determine what the user can see or do
- All UI was made from scratch with no templates

---
