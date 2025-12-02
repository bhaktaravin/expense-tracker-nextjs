import './seed-env';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

// Initialize Prisma with adapter for PostgreSQL
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // Create a demo user
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      password: hashedPassword,
    },
  });

  console.log('Created user:', user.email);

  // Create sample transactions
  const transactions = [
    { date: new Date('2024-11-28'), description: 'Whole Foods Market', amount: 87.42, category: 'Groceries', type: 'expense' },
    { date: new Date('2024-11-27'), description: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', type: 'expense' },
    { date: new Date('2024-11-26'), description: 'Uber Ride', amount: 24.50, category: 'Transportation', type: 'expense' },
    { date: new Date('2024-11-25'), description: 'Starbucks', amount: 6.75, category: 'Food & Dining', type: 'expense' },
    { date: new Date('2024-11-25'), description: 'Amazon Purchase', amount: 145.99, category: 'Shopping', type: 'expense' },
    { date: new Date('2024-11-24'), description: 'Electric Bill', amount: 120.00, category: 'Bills & Utilities', type: 'expense' },
    { date: new Date('2024-11-23'), description: 'Monthly Salary', amount: 5000.00, category: 'Salary', type: 'income' },
    { date: new Date('2024-11-22'), description: 'Chipotle', amount: 12.85, category: 'Food & Dining', type: 'expense' },
    { date: new Date('2024-11-21'), description: 'Target', amount: 63.21, category: 'Shopping', type: 'expense' },
    { date: new Date('2024-11-20'), description: 'Gas Station', amount: 45.00, category: 'Transportation', type: 'expense' },
    { date: new Date('2024-11-19'), description: 'Movie Tickets', amount: 28.00, category: 'Entertainment', type: 'expense' },
    { date: new Date('2024-11-18'), description: 'Trader Joe\'s', amount: 52.30, category: 'Groceries', type: 'expense' },
    { date: new Date('2024-12-02'), description: 'Grocery Shopping', amount: 93.15, category: 'Groceries', type: 'expense' },
    { date: new Date('2024-12-01'), description: 'Flight Booking', amount: 450.00, category: 'Travel', type: 'expense' },
  ];

  for (const transaction of transactions) {
    await prisma.transaction.create({
      data: {
        ...transaction,
        userId: user.id,
      },
    });
  }

  console.log(`Created ${transactions.length} transactions`);
  console.log('\nDemo credentials:');
  console.log('Email: demo@example.com');
  console.log('Password: password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
