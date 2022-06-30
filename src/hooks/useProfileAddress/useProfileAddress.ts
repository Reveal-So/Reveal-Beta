import { useState } from "react";
import { useRecoilState } from "recoil";

//import { profileAddressAtom } from "../../atoms/profileAddress";

export const useProfileAddress = () => {
  //const [profileAddress, setProfileAddress] =  useRecoilState(profileAddressAtom);
  const [profileAddress, setProfileAddress] = useState<any>();

  return { profileAddress, setProfileAddress };
};
