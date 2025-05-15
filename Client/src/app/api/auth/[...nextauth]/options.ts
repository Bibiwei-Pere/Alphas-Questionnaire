import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosInstance from "@/lib/axios-instance";
import GoogleProvider from "next-auth/providers/google";
import { setCookie } from "nookies"; // To set the refresh token securely

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
    role: string;
    id: string;
    email: string;
    error?: string;
  }
}

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    role: string;
  }
  interface Session {
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
    error?: string;
    user: { role: string; id: string; email: string };
  }
}

export const options: NextAuthOptions = {
  pages: {
    signIn: "/",
    signOut: "/auth/logout",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      // profile callback runs after Google authentication
      profile: async (profile): Promise<any> => {
        console.log("Google Profile:", profile);
        try {
          const response = await axiosInstance.post("/auth/login", {
            email: profile.email,
            username: profile.name,
            isGoogleSignIn: true,
          });
          console.log(response.data);
          if (response.status === 200) {
            return {
              id: response.data.id, // assuming the backend returns the user id
              email: profile.email,
              name: profile.name,
              accessToken: response.data.accessToken, // Include accessToken from backend response
              refreshToken: response.data.refreshToken, // Include accessToken from backend response
              role: response.data.role || "User", // Include role from backend response
            };
          }
        } catch (error) {
          console.error(error);
          return null; // Return null if something goes wrong
        }
      },
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axiosInstance.post("/auth/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          const user = response.data;
          if (user) {
            setCookie(null, "refreshToken", user.refreshToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              path: "/",
              maxAge: 7 * 24 * 60 * 60,
            });
            return user;
          }
          return null;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken || "";
        token.role = user.role || "user";
        token.id = user.id || "";
        token.email = user.email || "";
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 1 day
      }

      if (Date.now() < token.accessTokenExpires) return token;

      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.role = token.role;
      session.refreshToken = token.refreshToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
  },
};

// Refresh access token function
async function refreshAccessToken(token: any) {
  console.log(token);
  try {
    const response = await axiosInstance.post(`/auth/refresh-token/${token.refreshToken}`);

    if (response.status !== 200) throw new Error("Failed to refresh token");

    const { accessToken } = response.data.data;
    return {
      ...token,
      accessToken,
      accessTokenExpires: Date.now() + 15 * 60 * 1000,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
