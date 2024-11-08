import Stripe from 'stripe';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '');
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      mode: 'setup',
      payment_method_types: ['card'],
      success_url: `${request.headers.get(
        'origin'
      )}/payment-confirmation?session_id={CHECKOUT_SESSION_ID}`
      return_url: `${request.headers.get(
        'origin'
      )}/payment-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      oat,
    });
    return NextResponse.json({
      id: session.id,
      client_secret: session.client_secret,
    });
  } catch (err) {
    return Response.json(err, {
      status: 400,
    });
  }
}
