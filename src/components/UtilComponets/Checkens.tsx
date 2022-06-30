//import { listaBusqImgAddressAtom, listaImgAddressAtom } from "../../atoms/address";
import { formatAddresslast6Digit, formatAddresslastDigit, formatAddressShort } from "../../libs/utils";
import { useEffect, useState } from "react";
//import { useRecoilState } from "recoil";
import { classNames } from "./className";
import { lookupEnsAddress } from "../../libs/ens";
import Link from "next/link";


export const Checkens = ({address}:{address?:any}) => {
  const [msEns, setMsEns] = useState("");
  const [Band, setBand] = useState<any>(false);
  
  useEffect(() => {
    if (!address) return
    lookupEnsAddress(address).then ((val:any)=>{
        if (val){
            setMsEns(val);
            setBand(true);
        }
    });
  }, [address]);

  
  return (
    <>
      {!Band? (
        <Link
        passHref
        href={`/${address}`}>
        <a className="hover:underline ">{formatAddressShort(address)}</a>
      </Link>
      ) : (
        <Link
        passHref
        href={`/${msEns}`}>
        <a className="hover:underline ">{msEns}</a>
      </Link>
      )}
    </>
  );
};
