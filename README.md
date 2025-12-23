# 🩸 LifeFlow Donate

**LifeFlow Donate** is a web-based blood donation and request platform designed to connect blood donors with people in need.  
The platform also supports funding/donation features to help manage blood donation campaigns and related activities.

---

## 🌐 Live Website

🔗 **Live URL:** https://liveflow-9ebbf.web.app

---

## 🎯 Purpose of the Project

The main purpose of LifeFlow Donate is to:
- Simplify the blood donation process
- Help users request blood easily
- Connect donors and recipients efficiently
- Maintain donation and funding records securely
- Raise funds for blood donation campaigns

---

## ✨ Key Features

### 👤 User Features
- User authentication (login & registration)
- Create blood donation requests
- Join as a blood donor
- View donation requests
- Donate funds securely using Stripe
- Anonymous or named donations
- View donation history

### 🩸 Blood Donation System
- Blood request management
- Donor information tracking
- Request status update (pending / inprogress / done)

### 💳 Funding & Payment
- Secure Stripe payment integration
- Real-time donation recording using Stripe webhooks
- Duplicate payment prevention
- Total funding calculation

### 🛠️ Admin / Dashboard Features
- Manage users
- Manage blood donation requests
- View all donations and funding history
- Block / activate users

---

## 🧑‍💻 Tech Stack

### Frontend
- React
- React Router DOM
- Tailwind CSS
- Axios
- Firebase Authentication

### Backend
- Node.js
- Express.js
- MongoDB
- Stripe (Checkout + Webhooks)
- JWT Authentication

---

## 📦 NPM Packages Used

### Frontend
- `react`
- `react-router-dom`
- `axios`
- `firebase`
- `react-hook-form`
- `react-hot-toast`
- `lucide-react`

### Backend
- `express`
- `mongodb`
- `stripe`
- `jsonwebtoken`
- `cors`
- `dotenv`
- `body-parser`

---

## 🔐 Payment Security

- Stripe Checkout Session
- Stripe Webhook verification
- MongoDB unique index to prevent duplicate transactions
- Backend-only payment confirmation

---

## 📊 Database

- MongoDB Atlas
- Collections:
  - users
  - bloodRequests
  - donations
  - funding

---

## 🚀 How to Run Locally

### Clone the Repository
```bash
git clone https://github.com/Rah-Mizanur/LiveFlow-Donate-Client
