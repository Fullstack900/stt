import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Your authentication logic
        const user = {
          id: "1",
          name: "Test User",
          email: credentials?.email,
        };

        if (
          credentials?.email === "test@email.com" &&
          credentials?.password === "password"
        ) {
          return user;
        }

        // If authentication fails
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
