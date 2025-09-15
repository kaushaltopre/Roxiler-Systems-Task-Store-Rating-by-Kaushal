# Roxiler Systems Rating System Frontend

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. The application will run on http://localhost:3000

## Features Implemented

### Authentication
- User registration with validation
- Login system with role-based redirection

### System Administrator
- Dashboard with total counts (users, stores, ratings)
- User management with filtering
- Store management with ratings display
- Create new users and stores
- Logout functionality

### Normal Users
- Store browsing with search functionality
- Rating submission (1-5 scale)
- Rating modification
- Password update
- Logout functionality

### Store Owners
- View store ratings and average
- See customer list who rated
- Password update
- Logout functionality

## Form Validations
- Name: 20-60 characters
- Address: Max 400 characters
- Password: 8-16 characters with uppercase and special character
- Email: Standard validation
- Ratings: 1-5 scale

## Default Admin Login
- Email: admin@system.com
- Password: Admin@123

## Tech Stack
- React 18
- React Router DOM
- Axios for API calls
- Context API for state management