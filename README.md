# 🏪 Roxiler SystemsStore Rating System

A comprehensive full-stack web application for managing store ratings with role-based authentication and modern UI design.

## 🚀 Features

### 👨‍💼 System Administrator
- **Dashboard Analytics** - View total users, stores, and ratings
- **User Management** - Create and manage all user types with filtering
- **Store Management** - Create stores and view ratings
- **Advanced Filtering** - Filter by name, email, address, and role

### 👤 Normal Users
- **Store Discovery** - Browse and search all registered stores
- **Rating System** - Submit and modify ratings (1-5 stars)
- **Profile Management** - Update password and account settings
- **Search Functionality** - Find stores by name and address

### 🏪 Store Owners
- **Store Dashboard** - View store performance and ratings
- **Customer Analytics** - See who rated your store
- **Rating Overview** - Track average ratings and feedback

## 🛠️ Tech Stack

### Backend
- **Framework:** Express.js
- **Database:** Supabase(PostgreSQL)
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **ORM:** Sequelize

### Frontend
- **Framework:** React 18
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Styling:** Modern CSS with gradients and animations

## 📋 Prerequisites

- Node.js (v14 or higher)
- Supabase(PostgreSQL IPv4) Connection
- npm or yarn

## ⚡ Quick Start
### 0. Clone The Repository
### 1. Backend Setup
```bash
cd Backend
npm install

# Seed database with test data
npm run seed:data

# Start backend server
npm run dev
```

### 2. Frontend Setup
```bash
cd Frontend
npm install

# Start frontend development server
npm run dev
```

### 3. Access Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## 🔐 Test Accounts

### Administrator
- **Email:** admin@system.com
- **Password:** Admin@123

### Store Owners
- **Email:** john@storeowner.com | **Password:** Owner@123
- **Email:** sarah@retailbusiness.com | **Password:** Owner@456

### Normal Users
- **Email:** michael@customer.com | **Password:** User@123
- **Email:** emily@shopper.com | **Password:** User@456
- **Email:** david@regularuser.com | **Password:** User@789

## 📊 Sample Data

The application includes comprehensive test data:
- **6 Users** (1 admin, 2 store owners, 3 customers)
- **4 Stores** across different categories
- **9 Sample Ratings** with realistic distribution

### Test Stores
1. **TechMart Electronics Store** - Technology products
2. **Fashion Hub Clothing Store** - Fashion and apparel
3. **Green Grocery Fresh Market** - Organic groceries
4. **BookWorm Literature Store** - Books and literature


## 📁 Project Structure

```
Roxiler Systems Rating/
├── Backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic
│   ├── middlewares/     # Authentication & validation
│   ├── models/          # Database models
│   ├── routes/          # API endpoints
│   └── scripts/         # Database seeding
├── Frontend/
│   ├── public/          # Static files
│   └── src/
│       ├── components/  # Reusable components
│       ├── pages/       # Main application pages
│       ├── services/    # API and authentication
│       └── utils/       # Helper functions
└── README.md
```

## 🔧 Environment Configuration

### Backend (.env)
```env
DB_HOST=aws-1-ap-south-1.pooler.supabase.com
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres.kqwswdnuhfyqejhqeryl
DB_PASSWORD=root
JWT_SECRET=rating_system_jwt_secret_2024

```

## 📝 Form Validations

- **Name:** 20-60 characters
- **Email:** Standard email format
- **Password:** 8-16 characters, 1 uppercase, 1 special character
- **Address:** Maximum 400 characters
- **Ratings:** 1-5 star scale

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Configure production database
3. Run database migrations
4. Start with `npm start`

### Frontend Deployment
1. Build production bundle: `npm run build`
2. Serve static files from `build/` directory
3. Configure API base URL for production



