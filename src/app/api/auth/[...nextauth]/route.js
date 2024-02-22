import NextAuth from 'next-auth'
import CredentialsProviders from 'next-auth/providers/credentials'
import db from '@/libs/db'
import bcrypt from 'bcrypt'
export const authOptions = {
    providers: [
        CredentialsProviders({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email" },
                password: { label: "password", type: "password", placeholder: "*****" }
            },
            async authorize(credentials, req) {
                const userFound = await db.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if (!userFound) {
                    throw new Error('User not found')
                }
                const matchPassword = await bcrypt.compare(credentials.password, userFound.password)

                if (!matchPassword) {
                    throw new Error('Wrong password')
                }
                return {
                    id: userFound.id,
                    name: userFound.username,
                    email: userFound.email,
                }
            }
        })
    ],
    callbacks: {
        session: async ({ session, token }) => {
            if (session?.user) {
                session.user.id = token.sub;
            }
            return session;
        },
        jwt: async ({ user, token }) => {
            if (user) {
                token.uid = user.id;
            }
            return token;
        },
    },
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/auth/login',
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }