import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CreditCard, XCircle } from 'lucide-react';
import {
  fetchSubscription,
  translateSubscriptionInterval,
  translateSubscriptionStatus,
} from '@/lib/stripe';
import BannerWarning from '@/components/banner-warning';
import PricingCard from '@/components/pricing-card';
import { auth } from '@/auth';
import cancelSubscriptionAction from './cancel-subscription-action';
import Form from 'next/form';
import Link from 'next/link';

export default async function MySubscription() {
  const session = await auth();

  let subscription = null;

  if (session?.user?.email) {
    const email = session?.user?.email; // Replace with the actual email
    subscription = await fetchSubscription(email);
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Minha Assinatura</h1>
      {subscription && (
        <div className="flex gap-10">
          <PlanCard subscription={subscription} />
          <ActionCard subscription={subscription} />
        </div>
      )}
      {!subscription && (
        <>
          <BannerWarning text="Você precisa de uma assinatura ativa. Quer tal assinar agora?" />
          <PricingCard />
        </>
      )}
    </>
  );
}

function PlanCard({ subscription }: { subscription: any }) {
  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle>Detalhes da Assinatura</CardTitle>
        <CardDescription>Informações sobre seu plano atual</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Plano:</span>
            <span>{subscription.plan.nickname}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className="text-green-600">
              {translateSubscriptionStatus(subscription.status)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Próxima cobrança:</span>
            <span>
              {new Date(
                subscription.current_period_end * 1000
              ).toLocaleDateString('pt-BR')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Valor:</span>
            <span>
              {(subscription.plan.amount / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Ciclo:</span>
            <span>
              {translateSubscriptionInterval(subscription.plan.interval)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ActionCard({ subscription }: { subscription: any }) {
  return (
    <Card className="w-full max-w-sm h-full">
      <CardHeader>
        <CardTitle>Ações</CardTitle>
        <CardDescription>Gerencie sua assinatura</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Link
            href="https://billing.stripe.com/p/login/test_cN2dU55Ct6eC7IccMM"
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <CreditCard className="mr-2 h-5 w-5 text-gray-400" />
            Atualizar método de pagamento
          </Link>
          <Form action={cancelSubscriptionAction}>
            <input
              type="hidden"
              name="subscriptionId"
              value={subscription.id}
            />
            <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              <XCircle className="mr-2 h-5 w-5" />
              Cancelar assinatura
            </button>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
