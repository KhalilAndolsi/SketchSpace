import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "./connectDB";
import User from "@/models/User";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          await connectDB();
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            return null
          }
          const passwordIsCorrect = await bcrypt.compare(credentials.password, user.password);
          if (!passwordIsCorrect) {
            return null
          }
          return {
            id: user._id,
            username: user.username,
            email: user.email,
            pfp: `https://api.dicebear.com/7.x/notionists/svg/seed=${user._id}`
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token = user;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token;
      return session;
    },
  },
};
