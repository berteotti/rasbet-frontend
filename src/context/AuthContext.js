import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Children, createContext } from "react";
import { getUser } from "../api/api";
import { setCookie, getCookie } from "../cookie";
import { queryClient } from "../query";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const user = queryClient.getQueryData(["user"]);
  const token = process.browser ? getCookie("token") : null;

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(token),
    enabled: Boolean(token) && !Boolean(user),
    onSuccess: (data) => {
      if (data && data.results) {
        queryClient.setQueryData(["user"], data.results[0]);
      }
    },
    onError: () => {
      if (token) {
        setCookie("token", "", 0);
      }
    },
  });

  if (process.browser && !Boolean(user) && router.pathname === "/profile") {
    router.push("/");
  }
  const logout = () => {
    queryClient.setQueryData(["user"], null);
    setCookie("token", "", 0);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
