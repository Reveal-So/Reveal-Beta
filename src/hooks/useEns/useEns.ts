import { useMemo } from "react";
//import { useRecoilValue } from "recoil";

import useSWR from "swr";

//import { addressAtom } from "../../atoms/address";
import { ENS_SWR } from "../../const/swr";
import { lookupEnsAddress } from "../../libs/ens";
import { concatSwrPath, removeSwrPath } from "../../libs/utils";

export const useEns = () => {
  // const address = useState<any>();

  // const key = useMemo(() => {
  //   if (!address) {
  //     return null;
  //   }
  //   return concatSwrPath(ENS_SWR, address);
  // }, [address]);

  // // const { data, error, mutate } = useSWR<string>(
  // //   key,
  // //   address => {
  // //     //console.log("useEns",address);
  // //   //  return lookupEnsAddress(removeSwrPath(ENS_SWR, address));
  // //   },
  // //   {
  // //     revalidateIfStale: false,
  // //     revalidateOnFocus: false,
  // //     revalidateOnReconnect: false,
  // //   },
  // // );

  // return {
  //   isLoading: !error && !data,
  //   isError: !!error,
  //   ens: data,
  //   setEns: mutate,
  // };
};
