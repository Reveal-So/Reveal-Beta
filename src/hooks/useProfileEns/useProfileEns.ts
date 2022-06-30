//import { useRecoilValue } from "recoil";
import { useState } from "react";
import useSWR from "swr";

//import { profileAddressAtom } from "../../atoms/profileAddress";
import { ENS_SWR } from "../../const/swr";
import { lookupEnsAddress } from "../../libs/ens";
import { removeSwrPath, concatSwrPath } from "../../libs/utils";

export const useProfileEns = () => {
//   const profileAddress = useState<any>();
//  // const profileENS = useState<any>();
//   const key = concatSwrPath(ENS_SWR, profileAddress.toString());

//   const { data, error, mutate } = useSWR<string>(
//     key,
//     profileAddress => {
//       console.log("useProfileEns",profileAddress);
//      return lookupEnsAddress(removeSwrPath(ENS_SWR, profileAddress));
//     },
//     {
//       revalidateIfStale: false,
//       revalidateOnFocus: false,
//       revalidateOnReconnect: false,
//     },
//   );

//   return {
//     isLoading: !error && !data,
//     isError: !!error,
//     profileEns: data,
//     setProfileEns: mutate,
//   };
};
