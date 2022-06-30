import { useRouter } from "next/router";
import { useContext, useMemo, useState } from "react";
import ProfileContext from "../../context/Profile/ProfileContext";
import UserContext from "../../context/User/UserContext";
import { concatSwrPath } from "../../libs/utils";

export const useSwrPath = (swr: string) => {
  const { asPath } = useRouter();
  const {
    address,
  } = useContext(UserContext);
  const {
    addressConsulta,
  } = useContext(ProfileContext);
  

  //const profileAddress=asPath.startsWith("/profile")?address:addressConsulta;
  //const address = useState<any>();
  //const profileAddress = useState<any>();

  const key = useMemo(() => {
    if (asPath.startsWith("/profile")) {
      if (!address) {
        return null;
      }
      return concatSwrPath(swr, address.toString());
    }
    if (!addressConsulta) {
      return null;
    }
    return concatSwrPath(swr, addressConsulta.toString());
  }, [address, addressConsulta, asPath, swr]);

  return key;
};
