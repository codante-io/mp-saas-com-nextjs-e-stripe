import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ShoppingBag, ShoppingBasket } from 'lucide-react';
import Link from 'next/link';
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
    return <p>Erro: Alguma coisa aconteceu!</p>;
  }
  const session = await getSession(sessionId);

  if (!session) {
    return <p>Erro: Alguma coisa aconteceu!</p>;
  }

  if (session?.status === 'open') {
    return <p>O pagamento ainda está em aberto.</p>;
  }

  if (session?.status === 'complete') {
    const email =
      session.customer_email ?? session.customer_details?.email ?? '';

    return (
      <Card className="max-w-lg">
        <CardContent className="">
          <CardHeader className="text-center">
            <ShoppingBag className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <CardTitle>Assinatura Confirmada!</CardTitle>
            <CardDescription>
              Obrigado por se juntar a nossa comunidade LivroSaaS
            </CardDescription>
          </CardHeader>
          <div className="text-center text-gray-700 ">
            <p>
              Sua assinatura foi processada com sucesso e sua conta está ativa
              agora.
            </p>
            <p>Agora é só aproveitar nosso conteúdo</p>

            <Link href="/dashboard" className={cn(buttonVariants(), 'mt-12')}>
              Ir para Dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}
