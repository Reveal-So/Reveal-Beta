import type { AppProps } from "next/app";
//import { MutableSnapshot, RecoilRoot, RecoilState } from 'recoil';
import "../styles/globals.css";
//import { Seo } from "@/components/Seo";
import "../styles/index.css";
import "../styles/inter.css";
//import {./ as _jsx} from 'react/jsx-runtime';
import React from "react";
//import { SWRConfig } from "swr";

import UserState from "../context/User/UserState";
import ProfileState from "../context/Profile/ProfileState";
import { Seo } from "../components/Seo";
//import {jsx as _jsx} from 'react/jsx-runtime';
//var jsx = require(".");

//function
const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  // (
  //   <RecoilRoot>
  //      <Counter /><Component {...pageProps} />
  //   </RecoilRoot>)
  //console.log("Component",Component);
  //React.mo
  //<RepeatCharacters elemento={<Component {...pageProps} />} >

  //<Component {...pageProps} />
  //const myContext = React.createContext(undefined)
  return (
    <ProfileState>
      <UserState>
         {/* configuracion del header */}
         <Seo />
        <Component {...pageProps} />
      </UserState>
    </ProfileState>
  ); 
  //React.cloneElement(RecoilRoot)</RepeatCharacters>
  //.createElement('RecoilRoot',null, <Component {...pageProps} />);//React.createElement('RecoilRoot',null,<Component {...pageProps} />);
  //_jsx('h1', { children: 'Hello world' });

  // <RecoilRoot>

  //   </RecoilRoot>
  // (
  //   <>
  //   <RecoilRoot ></RecoilRoot>
  //   {/* <RecoilRoot ></RecoilRoot> */}
  //   </>
  //   );
};

export default MyApp;
//MyApp.
