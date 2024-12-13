import React from "react"
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { gnosis } from "wagmi/chains";
import PythonWeb3Wallet from "./PythonWeb3Wallet";

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: 'app',
  projectId: process.env.REACT_APP_RAINBOW_WALLET_PROJECT_ID!,
  chains: [
    gnosis,
  ],
});

ReactDOM.render(
  <WagmiProvider config={config}>
  <QueryClientProvider client={queryClient}>
    <RainbowKitProvider>
      <PythonWeb3Wallet />
    </RainbowKitProvider>
  </QueryClientProvider>
</WagmiProvider>,
  document.getElementById("root")
)