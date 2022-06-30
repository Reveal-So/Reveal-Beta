import { useRouter } from "next/router";
import { useContext, useEffect, useMemo } from "react";
import useSWR from "swr";

import { PIN_SWR } from "../../const/swr";
import ProfileContext from "../../context/Profile/ProfileContext";
import UserContext from "../../context/User/UserContext";
import { useSwrPath } from "../../hooks/useSwrPath";
import { fetchPins } from "../../libs/pin";
import { removeSwrPath } from "../../libs/utils";
import type { Pin } from "../../types/pin";

export const usePins = () => {
  //console.log ("PIN_SWR",PIN_SWR);
  //
  const { asPath } = useRouter();
  
  
  // const pines= useMemo<{ data: Pin[] }>(() => {
  //    return asPath.startsWith("/profile")
  //     ? fetchPins(removeSwrPath(PIN_SWR, address))
  //     : fetchPins(removeSwrPath(PIN_SWR, addressConsulta));
  //     //!profile
  //     // ? address
  //     // : profile.bandEns
  //     // ? profile.ens
  //     // : profile.addressTrucate;
  // }, [asPath, address,addressConsulta]);
  const { address, pin  } = useContext(UserContext);
  useEffect(() => {
    console.log("pin",pin);
  }, [pin]);
  
  const key = useSwrPath(PIN_SWR);
  //console.log ("profileAddress",profileAddress);
  const { data, error } = useSWR<{ data: Pin[] }>(key, profileAddress => { 
    return fetchPins(removeSwrPath(PIN_SWR, profileAddress));
  });
  //{ refreshInterval: 5 }

  return {
    isLoading: !error && !data,
    isError: !!error,
    pins: data?.data?.filter(pin => {
      return pin.type;
    }) as Pin[],
  };
};
