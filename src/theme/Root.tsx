import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import GlobalContext from "@site/src/contexts/GlobalContext";
import { WagmiConfig } from "wagmi";
import { wagmiClient, chains } from "@site/src/utils/connect";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "@site/src/contexts/AuthContext";

import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
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
          <AuthProvider>
            <RainbowKitProvider modalSize="compact" chains={chains}>
              {children}
            </RainbowKitProvider>
          </AuthProvider>
          <Toaster position="top-center" />
        </GlobalContext.Provider>
      </QueryClientProvider>
      <Analytics />
    </WagmiConfig>
  );
}
