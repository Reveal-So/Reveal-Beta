import { OPENSEA_BASE_URL } from "../const/api";
import { fetcher } from "./fetcher";
import type { OpenseaAsset } from "../types/opensea";
///collections?asset_owner
const ASSETS = "/assets?owner=";

export const OPENSEA_API_URL = (address: string) => {
  return OPENSEA_BASE_URL + ASSETS + address;
};

export const fetchOpenseaAssets = (
  address: string,
): Promise<{ assets: OpenseaAsset[] }> => {
  return fetcher(OPENSEA_API_URL(address));
};
