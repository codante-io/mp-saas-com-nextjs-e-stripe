import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { findUserByCredentials } from './lib/user';
import { PrismaAdapter } from '@auth/prisma-adapter';
import db from './lib/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await findUserByCredentials(
          credentials.email as string,
          credentials.password as string
        );

        return user;
      },
    }),
  ],
});
