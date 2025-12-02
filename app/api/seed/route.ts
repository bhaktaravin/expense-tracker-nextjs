import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
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
      { date: new Date('2024-12-02'), description: 'Grocery Shopping', amount: 93.15, category: 'Groceries', type: 'expense' },
      { date: new Date('2024-12-01'), description: 'Flight Booking', amount: 450.00, category: 'Travel', type: 'expense' },
    ];

    // Delete existing transactions for this user
    await prisma.transaction.deleteMany({
      where: { userId: user.id },
    });

    // Create new transactions
    for (const transaction of transactions) {
      await prisma.transaction.create({
        data: {
          ...transaction,
          userId: user.id,
        },
      });
    }

    return NextResponse.json({
      message: 'Database seeded successfully',
      user: { email: user.email, name: user.name },
      transactionCount: transactions.length,
      credentials: {
        email: 'demo@example.com',
        password: 'password123',
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database', details: String(error) },
      { status: 500 }
    );
  }
}
