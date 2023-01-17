import "../styles/globals.css";
import { ChakraProvider, InputLeftElement } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../src/query";
import { AuthProvider } from "../src/context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
