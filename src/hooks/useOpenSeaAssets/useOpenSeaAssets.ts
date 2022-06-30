import { useRouter } from "next/router";
import { useContext } from "react";
import useSWR from "swr";

import { OPENSEA_SWR } from "../../const/swr";
import ProfileContext from "../../context/Profile/ProfileContext";
import UserContext from "../../context/User/UserContext";
import { useSwrPath } from "../../hooks/useSwrPath";
import { fetchOpenseaAssets } from "../../libs/opensea";
import { removeSwrPath } from "../../libs/utils";
import type { OpenseaAsset } from "../../types/opensea";

export const useOpenSeaAssets = () => {
  const { asPath } = useRouter();
  // const {
  //   address,
  // } = useContext(UserContext);
  // const {
  //   addressConsulta,
  // } = useContext(ProfileContext);

  // const profileAddress=asPath.starsWith("/profile")?address:addressConsulta;
 // const key = useSwrPath(PIN_SWR);
  //console.log ("profileAddress",profileAddress);
  //const { data, error } = useSWR<{ data: Pin[] }>({key,profileAddress}, profileAddress => { 

  const key = useSwrPath(OPENSEA_SWR);

  const { data, error } = useSWR<{ assets: OpenseaAsset[] }>(
    key,
    profileAddress => {
      //console.log("profileAddress",profileAddress);
      return fetchOpenseaAssets(removeSwrPath(OPENSEA_SWR, profileAddress));
    },
  );

  return {
    isLoading: !error && !data,
    isError: !!error,
    assets: data?.assets,
  };
};
