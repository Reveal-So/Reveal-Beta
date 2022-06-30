import * as React from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useWeb3Modal } from "../../hooks/useWeb3Modal";
import { Avatars } from "../UtilComponets/Avatars";
import UserContext from "../../context/User/UserContext";
import { WalletConnect } from "../WalletConnect";

// const WalletConnect = dynamic<any>(() => {
//     return import("../WalletConnect").then((mod) => {
//       return mod.WalletConnect;
//     });
//   },
//   {
//     ssr: false,
//   }
// );

export const HeaderDropdown = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }

    prevOpen.current = open;
  }, [open]);
  const {
    address,
    avatar,
    web3Provider,
    setWeb3Provider,
    setAddress,
    setEns,
  } = useContext(UserContext);
  const router = useRouter();
  const web3Modal = useWeb3Modal();

  const disconnectWallet = useCallback(() => {
    web3Modal?.clearCachedProvider();
    setWeb3Provider(null);
    setAddress(null);
    setEns(null);
    router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, web3Modal]);

  if (!web3Provider) {
    return (
      <WalletConnect
        className="flex justify-center items-center py-2 px-4 ml-3
      text-base font-medium text-gray-800 bg-gray-200 hover:bg-gray-200 rounded-full border border-transparent shadow-sm">
        Connect Wallet
      </WalletConnect>
    );
  }
  return (
    <Stack direction="row">
      <div className="px-5">
        <button
          ref={anchorRef}
          id="composition-button"
          onClick={handleToggle}
          className="bg-gray-800 rounded-full flex text-sm text-white focus:outline-none
     hover:ring-2 hover:ring-white">
          <Avatars
            address={address}
            tam={1}
            icono={avatar}
            bandNoBuscar={true}
          />
        </button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                    className="relative mt-0 pt-5 w-[160px] h-[35px] rounded-md px-0 mx-0 bg-white hover:bg-gray-200">
                    <MenuItem
                      onClick={handleClose}
                      className="pt-1 m-0 hover:bg-gray-200 ">
                      <button
                        className={`absolute text-gray-900 hover:bg-gray-200
                                          items-center w-[160px] h-[30px] px-2 left-0 mt-1  py-2  pt-2 text-sm `}
                        onClick={disconnectWallet}>
                        Disconnect Wallet
                      </button>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
};
