import Navbar from './navbar';
import { auth } from '@/auth';
import db from '@/lib/db';
import { fetchSubscriptionByEmail } from '@/lib/stripe';
import type { User } from '@/lib/user';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = await db.user.findUnique({
    where: {
      email: session?.user?.email ?? '',
    },
  });

  if (!session || !user) {
    redirect('/login');
  }

  const subscription = await fetchSubscriptionByEmail(user.email);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar subscription={subscription} user={user} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
