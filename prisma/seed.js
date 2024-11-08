import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.card.createMany({
    data: [
      {
        prompt: 'What is JavaScript?',
        answer: 'A programming language for web development',
        amountUnderstood: 50,
        nextScheduledAt: new Date(),
      },
      {
        prompt: 'What is SQL?',
        answer: 'A language for managing databases',
        amountUnderstood: 60,
        nextScheduledAt: new Date(),
      },
      {
        prompt: 'What does HTML stand for?',
        answer: 'HyperText Markup Language',
        amountUnderstood: 70,
        nextScheduledAt: new Date(),
      },
      {
        prompt: 'What is CSS used for?',
        answer: 'Styling web pages',
        amountUnderstood: 80,
        nextScheduledAt: new Date(),
      },
      {
        prompt: 'What does HTTP stand for?',
        answer: 'HyperText Transfer Protocol',
        amountUnderstood: 65,
        nextScheduledAt: new Date(),
      },
      {
        prompt: 'What is an API?',
        answer: 'Application Programming Interface',
        amountUnderstood: 55,
        nextScheduledAt: new Date(),
      },
      {
        prompt: 'What is React?',
        answer: 'A JavaScript library for building user interfaces',
        amountUnderstood: 75,
        nextScheduledAt: new Date(),
      },
      {
        prompt: 'What does JSON stand for?',
        answer: 'JavaScript Object Notation',
        amountUnderstood: 60,
        nextScheduledAt: new Date(),
      },
      {
        prompt: 'What is Git?',
        answer: 'A version control system for tracking changes in code',
        amountUnderstood: 70,
        nextScheduledAt: new Date(),
      },
      {
        prompt: 'What is a function in programming?',
        answer: 'A block of code designed to perform a particular task',
        amountUnderstood: 85,
        nextScheduledAt: new Date(),
      },
    ],
  });

  console.log('Database seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });