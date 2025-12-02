# Banking App - Full-Stack Spending Tracker

A modern banking application with complete backend and database integration that helps users track and analyze their spending habits.

## ✨ Features

### Authentication & Security
- User registration with bcrypt password hashing
- Secure login/logout system
- Session persistence with localStorage
- Protected dashboard routes

### Transaction Management
- Add new transactions with custom amounts and categories
- View all transactions with real-time database updates
- Categorize spending across 10+ predefined categories
- Track both income and expenses

### Analytics & Insights
- **Interactive Pie Chart**: Visual breakdown of spending by category
- **Monthly Trend Analysis**: Bar chart showing income vs expenses over time  
- **Category Cards**: Detailed view with percentages and transaction counts
- **Financial Summary**: Balance, total income, total expenses at a glance

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Backend**: Next.js API Routes (REST API)
- **Database**: SQLite with Prisma ORM v7
- **Charts**: Recharts
- **Icons**: Lucide React
- **Authentication**: bcryptjs

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run database migrations  
npx prisma migrate dev

# Start development server
npm run dev
```

Visit **http://localhost:3000**

## 📊 Seeding Demo Data

Option 1: POST request to seed endpoint
```bash
curl -X POST http://localhost:3000/api/seed
```

Option 2: Visit the URL in your browser (POST request)

**Demo Account Credentials:**
- Email: `demo@example.com`
- Password: `password123`

## 📁 Project Structure

```
banking/
├── app/
│   ├── api/              # REST API routes
│   │   ├── auth/         # Login & registration
│   │   ├── transactions/ # CRUD operations
│   │   └── seed/         # Database seeding
│   ├── dashboard/        # Main dashboard page
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   └── page.tsx          # Landing page
├── components/           # React components
├── contexts/             # Auth context provider
├── lib/                  # Prisma client & utilities
├── prisma/               # Database schema & migrations
└── types/                # TypeScript definitions
```

## 🗄️ Database Schema

### Users Table
- `id`: UUID primary key
- `email`: Unique email address
- `name`: User's full name
- `password`: Bcrypt hashed password
- `createdAt`, `updatedAt`: Timestamps

### Transactions Table
- `id`: UUID primary key
- `date`: Transaction date
- `description`: Transaction description
- `amount`: Decimal amount
- `category`: Spending category
- `type`: 'expense' or 'income'
- `userId`: Foreign key to Users
- `createdAt`, `updatedAt`: Timestamps

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Authenticate user

### Transactions
- `GET /api/transactions` - Get all user transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/[id]` - Update transaction
- `DELETE /api/transactions/[id]` - Delete transaction

### Utilities
- `POST /api/seed` - Seed database with demo data

## 💾 Database

The app uses **SQLite** for local development (`./dev.db`). For production, Prisma supports easy migration to PostgreSQL, MySQL, MongoDB, and other databases.

## 📝 License

Open source - MIT
