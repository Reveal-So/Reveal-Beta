import { type } from "os";
import useSWR from "swr";

import { POAP_SWR } from "../../const/swr";
import { useSwrPath } from "../../hooks/useSwrPath";
import { fetchPoaps } from "../../libs/poap";
import { removeSwrPath } from "../../libs/utils";
import type { Poap } from "../../types/poap";

export const usePoaps = () => {
  const key = useSwrPath(POAP_SWR);
   type  propsPoap={ data:any, error:any };
  const listapoap:any = useSWR<{ accounts: { tokens: Poap[] } }>(
    key,
    profileAddress => {
      return fetchPoaps(removeSwrPath(POAP_SWR, profileAddress.toLowerCase()));
    },
  );

  return {
    isLoading: !listapoap.error && !listapoap.data,
    isError: !!listapoap.error,
    poaps: listapoap.data?.accounts[0]?.tokens as Poap[],
  };
};
