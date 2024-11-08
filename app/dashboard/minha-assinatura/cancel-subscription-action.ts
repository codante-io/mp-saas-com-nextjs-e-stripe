'use server';

import db from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { revalidatePath } from 'next/cache';

export default async function cancelSubscriptionAction(formData: FormData) {
  const subscriptionId = formData.get('subscriptionId') as string;
  const subscription = await stripe.subscriptions.cancel(subscriptionId, {
    expand: ['customer'],
  });

  revalidatePath('/dashboard/minha-assinatura');

  console.log(subscription);
}
