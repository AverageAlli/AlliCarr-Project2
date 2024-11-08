import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt, answer } = req.body;
    try {
      const newCard = await prisma.card.create({
        data: {
          prompt,
          answer,
          amountUnderstood: 0,  
          nextScheduledAt: new Date(),
        },
      });
      res.status(201).json(newCard);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create card' });
    }
  } else if (req.method === 'GET') {
    const cards = await prisma.card.findMany();
    res.status(200).json(cards);
  }
}