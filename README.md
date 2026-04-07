# Meeting Room Booking System

## Overview

The Meeting Room Booking System is a user-friendly platform designed for booking meeting rooms in co-working spaces. With a focus on intuitive design, secure transactions, and robust management tools, it serves both regular users and administrators, ensuring a seamless experience for all.

## Live Link: https://meeting-room-booking-frontend.vercel.app

## Server Link: https://meeting-room-booking-gilt.vercel.app

## Technologies Used:

- Frontend: Typescript, React, Redux, Redux Toolkit, React Router, TailwindCSS, Shadcn, antd, Framer Motion, React Lottie, React Icons, React Calender, React Date Picker, React Slick/ Carosoul, Sonner, Strpe Payment Gateway.

- Backend: Typescript, Node.js, Express.js, MongoDB, Mongoose, JWT, Zod, Bcrypt, Stripe

## Features

### Public Pages

- **Homepage:**

  - Header with navigation links for Home, Meeting Rooms, About Us, Contact Us, and Login/Register.
  - Hero section featuring a modern workspace visual, headline, subheadline, and a "Book Now" CTA.
  - Service Advertisement section highlighting Real-Time Availability, Instant Booking, and more.
  - Featured Rooms section with cards displaying room details and a "See More" option.
  - Additional sections: "Why Choose Us?", "How It Works", Customer Testimonials, and Footer with contact information and social links.

- **About Us:**

  - Creative animations with sections on our mission, team, and story.

- **Contact Us:**

  - Contact information with a form for direct inquiries.

- **Error Pages:**
  - Custom 404 page guiding users back to safe pages.

### User Authentication

- **Sign Up:**
  - Allows account creation with fields for name, email, password, and more.
  - Users are assigned a "USER" role by default, with the option for admin promotion.
- **Login:**
  - Token-based authentication with error handling.

### Meeting Rooms Page

- **Room Listings:**
  - Search, filter, and sort functionality.
  - Room cards display essential details with a "See Details" button.

### User Pages (Protected)

- **Room Details:**
  - Detailed room information with a "Book Now" button.
- **Booking Process:**
  - Date and time selection with available slots based on booking status.
  - Pre-filled user details in the booking form.
- **Checkout:**

  - Booking summary, payment options, and a confirmation modal.

- **My Bookings:**
  - Displays all user bookings with room details, date & time, and status.

### Admin Pages (Admin Only)

- **Admin Dashboard:**
  - **Room Management:** Create, update, and delete rooms with real-time updates.
  - **Slots Management:** Manage slots with optimistic updates.
  - **Booking Management:** Approve, reject, and delete bookings.

## Bonus Features

- **Debounced API Calls:** Efficient search functionality.
- **Micro-Animations:** Enhanced user experience.
- **Stripe Integration:** Secure payment processing.
- **Scroll to Top Button:** Simplified navigation.

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/ProgrammerShahJalal/meeting-room-booking.git
   ```
2. Install dependencies:

```
npm install
```

3. Start the development server:

```
npm run dev
```

Thanks

### All Rights Reserved by Md Shah Jalal
