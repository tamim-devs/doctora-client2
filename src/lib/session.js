import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const getUser = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return null;
    }

    return session.user;
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
};