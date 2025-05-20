import type { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { amount } = req.body;

  const options = {
    amount,
    currency: 'INR',
    receipt: 'receipt_order_' + Math.random().toString(36).slice(2),
  };

  try {
    const order = await razorpay.orders.create(options);
    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({ err: 'Failed to create Razorpay order' });
  }
}
