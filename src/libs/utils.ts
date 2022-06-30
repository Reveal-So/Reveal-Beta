export const formatAddressShort = (address?: string): any => {
  if (!address) return null;

  return `${address.slice(0, 4)}…${address.slice(
    address.length - 4,
    address.length,
  )}`;
};

export const concatSwrPath = (swr: string, address: string) => {
  return swr + address;
};

export const removeSwrPath = (swr: string, path: string) => {
  return path.replace(swr, "");
};

export const formatAddresslast6Digit = (address?: string): any => {
  if (!address) return null;

  return `${address.slice(
    address.length - 6,
    address.length,
  )}`;
};


export const formatAddresslastDigit = (address?: any): any => {
  if (!address) return null;
//console.log ("formatAddresslastDigit",address)
  return `${address.slice(
    address.length - 1,
    address.length,
  )}`;
};
