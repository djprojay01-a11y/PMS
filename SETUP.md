# SwiftWheels PMS - Complete Setup Guide

## Project Overview

SwiftWheels Promotion and Marketing Subsystem (PMS) is a comprehensive web application for managing vehicle promotions, customers, and marketing campaigns.

### Features
✅ User Authentication (Register/Login with JWT)
✅ Vehicle Management (CRUD Operations)
✅ Customer Management (CRUD Operations)
✅ Promotion Management with date scheduling
✅ Promotion-Vehicle linking system
✅ Advanced Reporting and Analytics
✅ Role-based Access Control (Admin, Manager, User)
✅ Search and Filter capabilities
✅ Responsive Design with Tailwind CSS
✅ Protected Routes with Session Management

---

## Backend Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create environment file:**
```bash
cp ../.env.example .env
```

4. **Update .env with your configuration:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/swiftwheels_pms
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRATION=7d
CORS_ORIGIN=http://localhost:3000
```

### Running Backend

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

Server runs on: `http://localhost:5000`

---

## Frontend Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create environment file:**
```bash
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env.local
```

### Running Frontend

```bash
npm start
```

Application runs on: `http://localhost:3000`

---

## API Endpoints

### Authentication
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - User login
POST   /api/auth/logout            - User logout
GET    /api/auth/profile           - Get current user profile (protected)
```

### Vehicles
```
POST   /api/vehicles               - Create vehicle (protected)
GET    /api/vehicles               - Get all vehicles (protected)
GET    /api/vehicles/:id           - Get vehicle by ID (protected)
PUT    /api/vehicles/:id           - Update vehicle (protected)
DELETE /api/vehicles/:id           - Delete vehicle (protected, admin/manager only)
```

### Customers
```
POST   /api/customers              - Create customer (protected)
GET    /api/customers              - Get all customers (protected)
GET    /api/customers/:id          - Get customer by ID (protected)
PUT    /api/customers/:id          - Update customer (protected)
DELETE /api/customers/:id          - Delete customer (protected, admin/manager only)
```

### Promotions
```
POST   /api/promotions             - Create promotion (protected, admin/manager only)
GET    /api/promotions             - Get all promotions (protected)
GET    /api/promotions/:id         - Get promotion by ID (protected)
PUT    /api/promotions/:id         - Update promotion (protected, admin/manager only)
DELETE /api/promotions/:id         - Delete promotion (protected, admin/manager only)
```

### Promotion-Vehicle Links
```
POST   /api/promotion-vehicles     - Create link (protected, admin/manager only)
GET    /api/promotion-vehicles     - Get all links (protected)
GET    /api/promotion-vehicles/:id - Get link by ID (protected)
PUT    /api/promotion-vehicles/:id - Update link (protected, admin/manager only)
DELETE /api/promotion-vehicles/:id - Delete link (protected, admin/manager only)
```

### Reports
```
GET    /api/reports/generate       - Generate custom report (protected)
GET    /api/reports/detailed       - Get detailed analytics (protected, admin/manager only)
```

---

## Database Models

### User Schema
```javascript
{
  userName: String (unique, required),
  password: String (hashed, required),
  role: String (admin | manager | user),
  createdAt: Date,
  updatedAt: Date
}
```

### Vehicle Schema
```javascript
{
  plateNumber: String (unique, required),
  brand: String (required),
  model: String (required),
  year: Number (required),
  vehicleType: String (sedan|suv|truck|van|hatchback|coupe|convertible),
  purchasePrice: Number (required),
  status: String (Active | Inactive | Blocked),
  registeredBy: ObjectId (FK: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Customer Schema
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (unique, required),
  phoneNumber: String (required),
  status: String (Active | Inactive | Blocked),
  registeredBy: ObjectId (FK: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Promotion Schema
```javascript
{
  title: String (required),
  description: String (required),
  discountType: String (free|percentage|FLAT_RATE|CASHBACK|BUY_ONE_GET_ONE|Bundle|amount),
  discountValue: Number (required),
  startDate: Date (required),
  endDate: Date (required),
  status: String (Active | Inactive | Blocked),
  createdBy: ObjectId (FK: User),
  createdAt: Date,
  updatedAt: Date
}
```

### PromotionVehicle Schema (Junction Table)
```javascript
{
  promotion: ObjectId (FK: Promotion, required),
  vehicle: ObjectId (FK: Vehicle, required),
  performance: String (Pending | In Progress | Completed),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Frontend Structure

```
frontend/src/
├── pages/
│   ├── Login.js
│   ├── Register.js
│   ├── Dashboard.js
│   ├── Vehicles.js
│   ├── VehicleForm.js
│   ├── Customers.js
│   ├── CustomerForm.js
│   ├── Promotions.js
│   ├── PromotionForm.js
│   ├── PromotionVehicles.js
│   └── Reports.js
├── components/
│   ├── Navbar.js
│   └── ProtectedRoute.js
├── context/
│   └── AuthContext.js
├── services/
│   └── api.js
├── App.js
├── index.js
└── index.css
```

---

## Backend Structure

```
backend/
├── models/
│   ├── User.js
│   ├── Vehicle.js
│   ├── Customer.js
│   ├── Promotion.js
│   └── PromotionVehicle.js
├── controllers/
│   ├── authController.js
│   ├── vehicleController.js
│   ├── customerController.js
│   ├── promotionController.js
│   ├── promotionVehicleController.js
│   └── reportController.js
├── routes/
│   ├── auth.js
│   ├── vehicles.js
│   ├── customers.js
│   ├── promotions.js
│   ├── promotionVehicles.js
│   └── reports.js
├── middleware/
│   └── auth.js
├── config/
│   └── database.js
├── server.js
└── package.json
```

---

## Testing the Application

### 1. Register a New User
- Navigate to `http://localhost:3000/register`
- Fill in username, password, and select role
- Click Register

### 2. Login
- Navigate to `http://localhost:3000/login`
- Enter credentials
- Click Login

### 3. Add Vehicles
- Go to Vehicles section
- Click "+ Add Vehicle"
- Fill in vehicle details
- Save

### 4. Add Customers
- Go to Customers section
- Click "+ Add Customer"
- Fill in customer details
- Save

### 5. Create Promotions
- Go to Promotions section (Admin/Manager only)
- Click "+ Create Promotion"
- Fill in promotion details with dates
- Save

### 6. Link Promotions to Vehicles
- Go to Promotion-Vehicle Links
- Click "+ Add Link"
- Select promotion and vehicle
- Create link

### 7. View Reports
- Go to Reports section
- Generate Summary or Detailed Report
- View analytics and statistics

---

## Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Nodemon** - Development auto-reload

### Frontend
- **React** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management

---

## Security Features

✅ Password hashing with bcryptjs
✅ JWT-based authentication
✅ HttpOnly cookies for token storage
✅ Protected routes with middleware
✅ Role-based access control
✅ CORS configuration
✅ Input validation
✅ Error handling

---

## Deployment

### Backend Deployment (Heroku example)
```bash
cd backend
heroku create your-app-name
heroku addons:create mongolab:sandbox
heroku config:set JWT_SECRET=your_secret_key
git push heroku main
```

### Frontend Deployment (Vercel example)
```bash
cd frontend
npm install -g vercel
vercel
```

---

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env file
- Verify database credentials

### CORS Errors
- Check CORS_ORIGIN in backend .env
- Ensure frontend URL matches
- Verify backend is running

### Authentication Issues
- Clear browser cookies and localStorage
- Check JWT_SECRET is set in .env
- Verify token expiration settings

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

---

## Support

For issues or questions, please refer to the respective documentation:
- Express.js: https://expressjs.com/
- MongoDB: https://docs.mongodb.com/
- React: https://react.dev/
- Tailwind CSS: https://tailwindcss.com/

---

## License

ISC License - Feel free to use this project for commercial and personal use.

---

**Last Updated:** June 8, 2026
**Version:** 1.0.0
