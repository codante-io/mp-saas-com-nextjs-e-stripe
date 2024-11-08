import PricingCard from '@/components/pricing-card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Check, MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import logo from './assets/logo.svg';
import womanImg from './assets/woman.svg';
import { auth } from '@/auth';
import PaymentButton from '@/components/payment-button';
import { fetchSubscriptionByEmail } from '@/lib/stripe';

export default async function Home() {
  const session = await auth();

  let subscription = null;

  if (session) {
    const email = session?.user?.email;
    subscription = await fetchSubscriptionByEmail(email ?? '');
  }

  return (
    <main>
      <section className="container mx-auto text-center pb-20 px-2 md:px-0">
        <nav className="flex justify-between items-center py-4">
          <Image src={logo} alt="Logotipo" />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MenuIcon size={24} className="md:hidden cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <a href={'/#funcionamento'}>
                <DropdownMenuItem>Funcionamento</DropdownMenuItem>
              </a>
              <DropdownMenuItem>Preço</DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/login">
                  <Button variant={'bg-white'}>Login</Button>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="items-center gap-1 hidden md:flex">
            <Link href={'#funcionamento'}>
              <Button variant={'link'}>Funcionamento</Button>
            </Link>
            <Link href={'#preco'}>
              <Button variant={'link'}>Preço</Button>
            </Link>
            {session && (
              <Link href="/dashboard">
                <Button variant={'bg-white'}>Dashboard</Button>
              </Link>
            )}
            {!session && (
              <Link href="/login">
                <Button variant={'bg-white'}>Login</Button>
              </Link>
            )}
          </div>
        </nav>
        <h1 className="md:text-6xl text-2xl font-bold mt-8 md:mt-16">
          Simplifique Seus Estudos{' '}
        </h1>
        <p className="text-gray-500 mt-4 text-sm md:text-xl max-w-3xl mx-auto">
          Deixe que nós fazemos a curadoria para você. Assine nossa plataforma e
          receba todos os meses um ebook novo de programação.
        </p>
        <form className="md:mt-16 mt-10">
          <div className="flex gap-2 justify-center">
            <Input
              placeholder="Coloque seu email"
              type="text"
              className="max-w-sm border-gray-300 border"
            />
            <Button>Assine Agora</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Comece sua assinatura agora mesmo. Cancele quando quiser.{' '}
          </p>
        </form>
      </section>
      <section className="bg-white md:py-16 py-8" id="funcionamento">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center">
            Como funciona?
          </h2>
          <div className="mx-24 xl:mx-80 flex flex-col md:flex-row items-center justify-between">
            <Image
              src={womanImg}
              alt="Mulher carregando caixas"
              className="max-w-xs"
            />
            <ul className="md:text-2xl text-lg text-muted-foreground space-y-4 md:space-y-6 flex-shrink-0">
              <li className="flex items-center justify-between gap-4">
                Acesso a 1 ebook por mês{' '}
                <Check size={24} className="text-green-600" />
              </li>
              <li className="flex items-center justify-between gap-4">
                Curadoria especial
                <Check size={24} className="text-green-600" />
              </li>
              <li className="flex items-center justify-between gap-4">
                Cancele quando quiser
                <Check size={24} className="text-green-600" />
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="md:py-16 py-8 text-center px-2" id="preco">
        <h2 className="md:text-6xl text-2xl font-bold md:mt-16">
          Preço Simples e Transparente
        </h2>
        <p className="text-gray-500 mt-4 text-sm md:text-xl max-w-3xl mx-auto">
          Pra que inúmeros planos quando nós sabemos exatamente o que é melhor
          para você? Assine o nosso plano mensal Pro Premium VIP e garanta
          mensalmente um ebook novo de programação. E por menos de um café por
          dia.
        </p>

        <div className="flex justify-center">
          <PricingCard />
        </div>
      </section>
      <section className="bg-white md:py-16 py-10 text-center">
        <h2 className="md:text-6xl text-2xl font-bold md:mt-16">
          Pronto Para Mudar Sua Vida?
        </h2>
        <p className="text-gray-500 mt-4 text-sm md:text-xl max-w-3xl mx-auto">
          Faça como milhares de outras pessoas. Assine nosso produto e tenha
          garantido seus estudos{' '}
        </p>

        {!subscription && (
          <>
            <PaymentButton className="mt-10 w-80" isLoggedIn={!!session}>
              Assine Agora
            </PaymentButton>
            <p className="text-xs text-muted-foreground mt-2">
              Comece sua assinatura agora mesmo. Cancele quando quiser.{' '}
            </p>
          </>
        )}

        <footer className="mt-16 border-t border-gray-300 pt-10">
          <Image src={logo} alt="Logotipo" className="mx-auto" />
          <p className="text-muted-foreground">
            © 2024 LivroSaaS. Todos os direitos reservados.
          </p>
        </footer>
      </section>
    </main>
  );
}
