import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PATCH') {
    const { amountUnderstood, nextScheduledAt } = req.body;
    try {
      const updatedCard = await prisma.card.update({
        where: { id: Number(id) },
        data: {
          amountUnderstood,
          nextScheduledAt: new Date(nextScheduledAt),
        },
      });
      res.status(200).json(updatedCard);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update card' });
    }
  } else if (req.method === 'GET') {
    try {
      const card = await prisma.card.findUnique({
        where: { id: Number(id) },
      });
      res.status(200).json(card);
    } catch (error) {
      res.status(404).json({ error: 'Card not found' });
    }
  }
}