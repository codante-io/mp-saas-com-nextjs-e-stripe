'use client';

import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { UserIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Form from 'next/form';
import logoutAction from '../(auth)/(logout)/logoutAction';
import PaymentButton from '@/components/payment-button';
import type { User } from '@/lib/user';

export default function Navbar({
  user,
  subscription,
}: {
  user: User;
  subscription: any;
}) {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-gray-700 hover:text-gray-900">
            <Logo />
          </Link>
        </div>
        <nav className="flex items-center space-x-4">
          {!subscription && (
            <PaymentButton isLoggedIn={true}>Assine Agora</PaymentButton>
          )}

          <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">
            <Button
              variant={'link'}
              className={cn(pathname === '/dashboard' ? 'underline' : '')}
            >
              Livro do Mês
            </Button>
          </Link>
          <Link
            href="/dashboard/minha-assinatura"
            className="text-gray-700 hover:text-gray-900"
          >
            <Button
              variant={'link'}
              className={cn(
                pathname === '/dashboard/minha-assinatura' ? 'underline' : ''
              )}
            >
              Minha Assinatura
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-gray-700 hover:text-gray-900">
                <UserIcon size={24} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
              <DropdownMenuLabel className="font-light uppercase text-xs">
                {user.name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Form action={logoutAction}>
                  <button>Logout</button>
                </Form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
