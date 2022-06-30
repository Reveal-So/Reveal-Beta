import WalletConnectProvider from "@walletconnect/web3-provider";
import { useMemo } from "react";
import Web3Modal from "web3modal";

export const useWeb3Modal = ():Web3Modal|null => {
  return useMemo<Web3Modal|null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return new Web3Modal({
      cacheProvider: true,
      providerOptions: {
        walletconnect: {
          display: {
            description: "Use Rainbow & other popular wallets",
          },
          package: WalletConnectProvider,
          options: {
            infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
          },
        },
      },
    });
  }, []);
};
