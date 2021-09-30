// import { useSession } from "@next-auth/react-query";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const AuthMiddleware = ({ children }) => {
  //   const [session, loading] = useSession({
  //     required: true,
  //     redirectTo: "/login",
  //   });

  const { data: session, status } = useSession();
  const loading = status === "loading";
  const isUser = !!session?.user;
  useEffect(() => {
    if (loading) return; // Do nothing while loading
    if (!isUser) signIn(); // If not authenticated, force log in
  }, [isUser, loading]);

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
};

export default AuthMiddleware;
