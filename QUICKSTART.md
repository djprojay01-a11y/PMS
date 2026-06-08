# SwiftWheels PMS - Quick Start

## 🚀 Quick Setup (2 Minutes)

### Step 1: Backend Setup
```bash
cd backend
npm install
cp ../.env.example .env
# Update .env with your MongoDB URI
npm run dev
```

### Step 2: Frontend Setup (New Terminal)
```bash
cd frontend
npm install
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env.local
npm start
```

### Step 3: Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

---

## 📋 Test Credentials

Register a new account or use:
- Username: `testuser`
- Password: `password123`
- Role: `admin`

---

## 🎯 Key Features to Try

1. **Authentication** - Register & Login
2. **Vehicles** - Create, Read, Update, Delete vehicles
3. **Customers** - Manage customer information
4. **Promotions** - Create time-based promotions
5. **Links** - Associate promotions with vehicles
6. **Reports** - Generate comprehensive analytics

---

## 🔧 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/swiftwheels_pms
JWT_SECRET=your_secret_key
JWT_EXPIRATION=7d
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📚 API Overview

### Core Routes
- **Auth**: `/api/auth/register`, `/api/auth/login`
- **Vehicles**: `/api/vehicles` (CRUD)
- **Customers**: `/api/customers` (CRUD)
- **Promotions**: `/api/promotions` (CRUD)
- **Links**: `/api/promotion-vehicles` (CRUD)
- **Reports**: `/api/reports/generate`, `/api/reports/detailed`

---

## 🎨 UI Features

✅ Responsive Tailwind CSS Design
✅ Navigation Bar with User Menu
✅ Protected Routes with Loading States
✅ Search & Filter Functionality
✅ Real-time Status Indicators
✅ Modal Forms
✅ Error Handling with User Feedback
✅ Success Notifications

---

## 🛡️ Security

✅ JWT Token Authentication
✅ Password Hashing (bcryptjs)
✅ Protected API Routes
✅ Role-based Access Control
✅ CORS Enabled
✅ HttpOnly Cookies

---

## 📞 Support

If you encounter any issues:
1. Check the SETUP.md file for detailed documentation
2. Ensure MongoDB is running
3. Verify .env files are properly configured
4. Check browser console for errors
5. Review backend logs

---

**Enjoy using SwiftWheels PMS! 🎉**
