import { ETHPLORER_BASE_URL } from "../const/api";
import { fetcher } from "./fetcher";
import type { Token } from "../types/token";

export const TOKEN_API_URL = (address: string) => {
  //return `${ETHPLORER_BASE_URL}/getAddressInfo/${address}?apiKey=${process.env.NEXT_PUBLIC_ETHPLORER_API_KEY}`;
  //console.log("ETHPLORER_API_KEY",process.env.NEXT_PUBLIC_ETHPLORER_API_KEY);
  if (process.env.NEXT_PUBLIC_ETHPLORER_API_KEY===undefined){
    return `${ETHPLORER_BASE_URL}/getAddressInfo/${address}?apiKey=freekey`;
  }else {
    return `${ETHPLORER_BASE_URL}/getAddressInfo/${address}?apiKey=${process.env.NEXT_PUBLIC_ETHPLORER_API_KEY}`;
  }
  
};

export const fetchToken = (address: string): Promise<Token> => {
  return fetcher(TOKEN_API_URL(address));
};