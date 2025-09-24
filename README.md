# StudyHub

A centralized platform for students to upload, share, and access study resources including notes, past exam papers, and study guides.

## Features

- User authentication (JWT)
- Upload/download study resources
- Search and filter by subject, semester, and tags
- Rating and feedback system
- Dashboard with top-rated and most-downloaded resources

## Technology Stack

**Frontend:** React.js, TailwindCSS, Axios, React Router  
**Backend:** Node.js, Express.js, MongoDB, JWT, Multer  
**Authentication:** JWT-based secure login

## Setup Instructions

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Update MONGO_URI and JWT_SECRET in .env
nodemon server.js
