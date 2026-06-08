# SwiftWheels PMS - Promotion and Marketing Subsystem

## Backend Setup

### Installation

1. Navigate to backend directory:
```bash
cd backend
npm install
```

2. Create `.env` file in root directory:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/swiftwheels_pms
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRATION=7d
CORS_ORIGIN=http://localhost:3000
REACT_APP_API_URL=http://localhost:5000/api
```

### Running the Backend

**Development Mode (with Nodemon):**
```bash
cd backend
npm run dev
```

**Production Mode:**
```bash
cd backend
npm start
```

Server will run on `http://localhost:5000`

## Frontend Setup

### Installation

1. Navigate to frontend directory:
```bash
cd frontend
npm install
```

2. Create `.env.local` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Running the Frontend

```bash
cd frontend
npm start
```

Frontend will run on `http://localhost:3000`

## API Routes

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile (protected)

### Vehicles
- `POST /api/vehicles` - Create vehicle (protected)
- `GET /api/vehicles` - Get all vehicles (protected)
- `GET /api/vehicles/:id` - Get vehicle by ID (protected)
- `PUT /api/vehicles/:id` - Update vehicle (protected)
- `DELETE /api/vehicles/:id` - Delete vehicle (protected, admin/manager only)

### Customers
- `POST /api/customers` - Create customer (protected)
- `GET /api/customers` - Get all customers (protected)
- `GET /api/customers/:id` - Get customer by ID (protected)
- `PUT /api/customers/:id` - Update customer (protected)
- `DELETE /api/customers/:id` - Delete customer (protected, admin/manager only)

### Promotions
- `POST /api/promotions` - Create promotion (protected, admin/manager only)
- `GET /api/promotions` - Get all promotions (protected)
- `GET /api/promotions/:id` - Get promotion by ID (protected)
- `PUT /api/promotions/:id` - Update promotion (protected, admin/manager only)
- `DELETE /api/promotions/:id` - Delete promotion (protected, admin/manager only)

### Promotion-Vehicle Links
- `POST /api/promotion-vehicles` - Create link (protected, admin/manager only)
- `GET /api/promotion-vehicles` - Get all links (protected)
- `GET /api/promotion-vehicles/:id` - Get link by ID (protected)
- `PUT /api/promotion-vehicles/:id` - Update link (protected, admin/manager only)
- `DELETE /api/promotion-vehicles/:id` - Delete link (protected, admin/manager only)

### Reports
- `GET /api/reports/generate` - Generate custom report (protected)
- `GET /api/reports/detailed` - Get detailed report (protected, admin/manager only)

## Database Models

### User
- userName (String, unique)
- password (String, hashed)
- role (String: admin, manager, user)

### Vehicle
- plateNumber (String, unique)
- brand (String)
- model (String)
- year (Number)
- vehicleType (String)
- purchasePrice (Number)
- status (String: Active, Inactive, Blocked)
- registeredBy (FK: User)

### Customer
- firstName (String)
- lastName (String)
- email (String, unique)
- phoneNumber (String)
- status (String: Active, Inactive, Blocked)
- registeredBy (FK: User)

### Promotion
- title (String)
- description (String)
- discountType (String)
- discountValue (Number)
- startDate (Date)
- endDate (Date)
- status (String: Active, Inactive, Blocked)
- createdBy (FK: User)

### PromotionVehicle (Junction Table)
- promotion (FK: Promotion)
- vehicle (FK: Vehicle)
- performance (String)

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcryptjs for password hashing
- CORS for cross-origin requests
- Cookie Parser for session management
- Nodemon for development

### Frontend
- React.js
- React Router DOM
- Axios for API calls
- Tailwind CSS for styling

## Features Implemented

✅ Authentication System (JWT + httpOnly Cookies)
✅ Session-based Login/Register
✅ Protected Routes
✅ CRUD Operations for all entities
✅ Search functionality
✅ Report Generation
✅ Role-based Access Control
✅ Responsive Design
✅ Modern UI with Tailwind CSS
