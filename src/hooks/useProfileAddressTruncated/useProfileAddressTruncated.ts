import { useState } from "react";
//import { useRecoilValue } from "recoil";

//import { profileAddressAtom } from "../../atoms/profileAddress";
import { formatAddressShort } from "../../libs/utils";

export const useProfileAddressTruncated = () => {
  const value = useState<any>();
  return formatAddressShort(value.toString());
};
