import { createClient } from "@tanstack/react-query";

export const queryClient = createClient();

// Instead of using the QueryClient class from the @tanstack/react-query library, we can use the createClient function to create
// a new instance of the query client. This eliminates the need to import the QueryClient class
// and creates a new client with the default configuration. This makes the code more simpler, and easier to reason about.