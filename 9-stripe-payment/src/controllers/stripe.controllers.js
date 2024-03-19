import { createError } from '../utils/errors.utils.js';
import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_API_KEY);

export const createPaymentIntent = async (req, res) => {
  const getItemPrice = (id) => {
    if (id === 1) {
      return 10;
    } else if (id === 2) {
      return 20;
    }
  };
  const { items } = req.body;
  let total = 0;
  for (const item of items) {
    const { id, quantity } = item;
    total += getItemPrice(id) * quantity;
  }
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'gbp',
  });

  res.json({ clientSecret: paymentIntent.client_secret });
};
