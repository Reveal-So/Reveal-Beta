import dynamic from "next/dynamic";
import { useContext, useMemo } from "react";
import { Disclosure } from "@headlessui/react";
import { HeaderSearchBar } from "../HeaderSearchBar";
import { Avatars } from "../UtilComponets/Avatars";
//import { WalletConnect } from "../WalletConnect";
import UserContext from "../../context/User/UserContext";
import { WalletConnect } from "../WalletConnect";
// const WalletConnect = dynamic<any>(
//   () => {
//     return import("../WalletConnect").then((mod) => {
//       return mod.WalletConnect;
//     });
//   },
//   {
//     ssr: false,
//   }
// );

export const HeaderMobileMenu = () => {
  const { address, avatar, addressTruncated, ens, web3Provider } =
    useContext(UserContext);
  const heroAddress = useMemo(() => {
    return ens ?? addressTruncated ?? "";
  }, [addressTruncated, ens]);

  //  const disconnectWallet = useCallback(() => {
  //     web3Modal?.clearCachedProvider();
  //     setWeb3Provider(null);
  //     setAddress(null);
  //     setEns(null);
  //     router.push("/");
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [router, web3Modal]);
  
  return (
    <Disclosure.Panel className="lg:hidden">
      <div className=" mx-2 mb-2">
        <HeaderSearchBar />
      </div>
      {web3Provider && (
        <div className="pb-3 border-t border-gray-700">
          <div className="flex items-center px-5 pt-4">
            <div className="flex-shrink-0">
              <Avatars
                address={address}
                tam={1}
                icono={avatar}
                bandNoBuscar={true}
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-white">
                {heroAddress}
              </div>
            </div>
          </div>
          <div className="mt-3 px-2 space-y-1"></div>
        </div>
      )}
      <div className="p-2 ">
        <WalletConnect
          className="flex justify-center items-center py-2 px-4 w-full
                text-base font-medium text-gray-800 bg-gray-200 hover:bg-gray-200 rounded-md border border-transparent shadow-sm">
          Connect Wallet
        </WalletConnect>
      </div>
    </Disclosure.Panel>
  );
};
