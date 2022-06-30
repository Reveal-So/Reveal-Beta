import { API_WALLET_PATH, API_WALLET_PATH2 } from "../const/api";
import { fetcher } from "./fetcher";

export const WALLET_PINS_URL = (address: string) => {
  return `${API_WALLET_PATH}/${address}`;
};

export const WALLET_LOGIN_URL = (address: string) => {
  return `${API_WALLET_PATH2}/${address}`;
};

export const fetchWallet = (address: string) : Promise<any> => {
 // console.log("fetchWallet",address);
  return fetcher(WALLET_PINS_URL(address), {
    headers: new Headers({ "content-type": "application/json" }),
    method: "GET",
  });
};

export const fetchWalletENS = (ens: string) => {
 // console.log("fetchWalletENS",ens);
  return fetcher(WALLET_PINS_URL(ens)+"&ens", {
    headers: new Headers({ "content-type": "application/json" }),
    method: "GET",
  });
};

export const createWallet = (address: string) => {
  //console.log("createWallet",address);
  return fetcher(WALLET_PINS_URL(address), {
    headers: new Headers({ "content-type": "application/json" }),
    method: "POST",
  });
};

export const createWalletEns = (address: string,ens: string) => {
 /// console.log("createWalletEns",address);
  return fetcher(WALLET_PINS_URL(address), {
    headers: new Headers({ "content-type": "application/json" }),
    method: "POST",
    body: JSON.stringify({ ens }),
  });
};

export const createWalletAvatar = (address: string,avatar: string) => {
//console.log("createWalletAvatar",address);
  return fetcher(WALLET_PINS_URL(address), {
    headers: new Headers({ "content-type": "application/json" }),
    method: "POST",
    body: JSON.stringify({ avatar }),
  });
};

export const registrarLogWallet = (address: string) => {
  //console.log("registrarLogWallet",address);
  return fetcher(WALLET_LOGIN_URL(address), {
    headers: new Headers({ "content-type": "application/json" }),
    method: "POST",
    body: JSON.stringify({ }),
  });
};

