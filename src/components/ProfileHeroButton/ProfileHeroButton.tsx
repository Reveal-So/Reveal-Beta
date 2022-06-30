import { ClipboardCopyIcon, CheckCircleIcon } from "@heroicons/react/solid";

import { useCallback } from "react";

import { METABIO_BASE } from "../../const/social";
import { useCopy } from "../../hooks/useCopy";

import IconocopiarProofile from '../../images/icono-copiarProofile.png';

export type ProfileHeroButtonProps = {
  value: string;
  valueMostrar : string;
  srcImg: string;
};
type propsprofileHeroButton={ value:any , valueMostrar:any };
export const ProfileHeroButton = ({ value , valueMostrar }:{ value:any, valueMostrar:any }) => {
  const { isCopied, copyText } = useCopy();

  const handleCopy = useCallback(() => {
    return copyText(`${METABIO_BASE}/${value}`);
  }, [copyText, value]);

  return (
    <button
      type="button"
      className="text-sm mt-0"
      onClick={handleCopy}
    >
      {/* 
      profileBotonCopiarPerfil
      {isCopied && (
        <CheckCircleIcon className="mr-3 -ml-1 w-5 h-5" aria-hidden="true" />
      )}
      {!isCopied && (
        <ClipboardCopyIcon className="mr-3 -ml-1 w-5 h-5" aria-hidden="true" />
      )}
      profileCopiarPerfil
       */}
      <span className="text-sm text-gray-400 pr-1">
        {isCopied ? "Copied!" : valueMostrar}
      </span>
      <img src={IconocopiarProofile.src} className="profileIconocopiarProfile inline mr-2 w-5 h-5"/>
    </button>
  );
};
