//import { useRecoilValue } from "recoil";

//import { addressAtom } from "../../atoms/address";
import { useState } from "react";
import { formatAddressShort } from "../../libs/utils";

export const useAddressTruncated = () => {
  const value = useState<any>();
  return formatAddressShort(value.toString());
};
