import React, { useState, useEffect } from "react";
import {toast, Toaster} from "react-hot-toast";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import GlobalContext from "@site/src/contexts/GlobalContext";
import { WagmiConfig } from "wagmi";
import { wagmiClient, chains } from "@site/src/utils/connect";
import { QueryClient, QueryCache, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: () => {
      toast.error(
          "Network Error: Ensure Metamask is connected to the same network that your contract is deployed to."
      );
    },
  }),
});

export default function Root({ children }) {
  const [uid, setUid] = useState(undefined);

  useEffect(() => {
    // TODO(b00l) 上线之前尝试去掉
    if (window.location.hash.includes("access_token")) {
      window.location.hash = "";
    }
  }, []);

  return (
    <WagmiConfig client={wagmiClient}>
      <QueryClientProvider client={queryClient}>
        <GlobalContext.Provider value={{ uid, setUid }}>
          <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
          <Toaster position="top-center" />
        </GlobalContext.Provider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}
