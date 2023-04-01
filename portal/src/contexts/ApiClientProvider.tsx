import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { ReactNode, useState } from "react";
import trpc from "../trpc";

interface ApiClientProviderProps {
  children: ReactNode;
}

const ApiClientProvider: React.FC<ApiClientProviderProps> = (props) => {
  const { children } = props;
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/trpc",
          headers: () => ({
            authorization: localStorage.getItem("sessionID") ?? "",
          }),
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};

export default ApiClientProvider;
