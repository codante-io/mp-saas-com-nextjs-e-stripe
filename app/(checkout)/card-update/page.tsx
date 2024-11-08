import db from '@/lib/db';
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '');

async function getSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId!);
    return session;
  } catch (error) {
    return null;
  }
}

export default async function CheckoutReturnPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const sessionId = searchParams?.session_id;

  console.log(sessionId);

  if (!sessionId || typeof sessionId !== 'string') {
    return <p>Error: Something wrong!</p>;
  }
  const session = await getSession(sessionId);

  if (!session) {
    return <p>Error: Something wrong!</p>;
  }

  if (session?.status === 'open') {
    return <p>O pagamento ainda está em aberto.</p>;
  }

  if (session?.status === 'complete') {
    const email =
      session.customer_email ?? session.customer_details?.email ?? '';

    console.log(email);
    await db.user.update({
      where: {
        email,
      },
      data: {
        isPro: true,
      },
    });

    console.log(session);
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-background py-32">
        <h1 className="text-4xl font-bold">Obrigado pela sua compra!</h1>
        <h3 className="text-xl font-semibold">Você já é um usuário PRO!</h3>
      </div>
    );
  }

  return null;
}
