import { providers } from "ethers";
import Link from "next/link";
import { useCallback, useContext, useEffect } from "react";
import { useWeb3Modal } from "../../hooks/useWeb3Modal";
import { useWeb3Provider } from "../../hooks/useWeb3Provider";
import UserContext from "../../context/User/UserContext";
import { useRouter } from "next/router";

export const WalletConnect = (props: any) => {
  useWeb3Provider();
  const router = useRouter();
  const web3Modal = useWeb3Modal();
  const { setAddress, address, web3Provider, setWeb3Provider, setEns } =
    useContext(UserContext);

  const connectWallet = useCallback(() => {
   // if (!web3Modal) return;
    //console.log("web3Modal",${web3Modal});
    //console.log("address",address);
    
    return web3Modal
      ?.connect()
      .then((provider: any) => {
        //console.log("provider",provider);
        return new providers.Web3Provider(provider);
      })
      .then((valor: any) => {
        //console.log("valor",valor);
        setWeb3Provider(valor);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Modal]);

  

  useEffect(() => {
    if (!web3Modal?.cachedProvider) {
      return;
    }
    connectWallet();
  }, [connectWallet, web3Modal?.cachedProvider]);

  const disconnectWallet = useCallback(() => {
    web3Modal?.clearCachedProvider();
    //web3Modal.
    setWeb3Provider(null);
    setAddress("");
    setEns("");
    router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Modal]);
  //setAddress, setEns, setWeb3Provider,
  // console.log("connectedChildren", props.connectedChildren);
  // console.log("href", props.href);
  // console.log("Web3Provider", web3Provider);
  // console.log("props", props);

  if (web3Provider && props.href && props.connectedChildren) {
    return (
      <Link href={props.href}>
        <a>
          <div>
            <div
              className="cssBoton inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full pl-10
             shadow-sm text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              {props.connectedChildren}
            </div>
          </div>
        </a>
      </Link>
    );
  }
  
  return (
    <button
      onClick={web3Provider ? disconnectWallet : connectWallet}
      {...props}>
      {address ? "Disconnect" : props.children}
    </button>
  );
};
