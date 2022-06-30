//import { useRecoilState } from "recoil";

import { useState } from "react";

///import { addressAtom } from "../../atoms/address";

export const useAddress = () => {
  const [address, setAddress] = useState<any>();

  return { address, setAddress };
};
