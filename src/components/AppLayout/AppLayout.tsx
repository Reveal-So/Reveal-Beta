import type { FC } from "react";

import { Footer } from "../Footer";
import { Header } from "../Header";
import { Footer2 } from "../Footer2";
import { Header2 } from "../header2";
import Segment from "react-segment-analytics";

export const AppLayout = ( props: any ) => {
  return (
    <Segment writeKey="NxWwVQbYbPt1ZryDRMickVNeGqcsk5Rg">
      <div className="relative h-full w-full ">
        {/*  lg:h-[85vh]*/}
        <div className="fixed top-0 z-40 w-full">
            <Header2 />
        </div>
        <div className=" top-0  w-full  bg-white">
          <div className="h-16 "></div>  
          {/* <Header2 />  */}
          {props.children}
          <Footer2 />
        </div>
      </div>
    </Segment>
  );
  //overflow-y-scroll 
  //return (h-screen
  //   <div className=" bg1 ">
  //     <Header2 />
  //     {children}
  //     <Footer2 />
  //   </div>
  // );
};
