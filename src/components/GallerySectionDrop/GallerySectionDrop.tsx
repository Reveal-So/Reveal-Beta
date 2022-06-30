//import { profileAddressAtom } from "../../atoms/profileAddress";
import { GalleryDustBin } from "../GalleryDustBin";
import { GallerySectionLayout } from "../GallerySection";
import { usePins } from "../../hooks/usePins";
import { fetchPins, fetchPins2 } from "../../libs/pin";
import { useContext, useEffect, useMemo, useState } from "react";
import UserContext from "../../context/User/UserContext";
//import { useRecoilValue } from "recoil";
//import type { Pin } from "../../types/pin";

export const GallerySectionDrop = () => {
  //const [bandVisible, setbandVisible] = useState(-1);
  const { pins } = usePins();
  
  // useMemo<any>(()=>{
  //     //console.log("followingProfileff",followingProfile);
  //     return 
  //   }
  //   ,[bandVisible]); 
  console.log("pins",pins)
  return (
    <div className="py-3 px-2 md:px-3 mx-auto w-full max-w-5xl">
      <GallerySectionLayout>
        {[0, 1, 2, 3].map(index => {
          const pin =
            pins?.filter(pin => {
              return pin.index === index;
            })?.[0] ?? null;
          return (
            <GalleryDustBin
              key={index}
              index={index}
              src={pin?.src ?? null}
              value={pin?.value ?? null}
              type={pin?.type ?? null}
            />
          );
        })}
      </GallerySectionLayout>
    </div>
  );
};
// export const GallerySectionDrop44 = () => {
//   //const [bandping, setbandping] = useState(false);
  
//   const [UltimoMod, setUltimoMod] = useState(-1);
//   const [listaPin, setlistaPin] = useState([]);
//   const profileAddress = useState<any>();
//   const { pins } =  usePins();

// //   useMemo(()=>{
// //     return usePins();
// //   }
// //  ,[bandVisible]);// useMemo
// //use
// // useEffect(() => {
// //   // console.log("cambio!!");
// //   // console.log("bandVisible",bandVisible);
// //   // console.log("listaPin",listaPin);
  
// //   //splice
// //   // let temp=listaPin.splice(0,bandVisible).concat(null,listaPin.splice(bandVisible))
// //   // console.log("temp",temp)
// //  // setlistaPin( [null,null,null,null]);
// //  if(!profileAddress) return;
// //  if(bandVisible==-1&&UltimoMod!=bandVisible) return;
// //    fetchPins2(profileAddress).then((resp)=>{
// //     let pins=resp.data;
// //     //pins=
// //     let listatemp=[];
// //     //console.log("Pin",pins);
// //     [0, 1, 2, 3].map(index => {
// //       let temp=pins?.filter(pin => {
// //              return pin.index === index&&bandVisible!=index;
// //            })?.[0] ?? null;
// //            listatemp=[...listatemp,temp];
// //    });
// //    //console.log("listatemp",listatemp);
// //    setlistaPin([]);
// //    setlistaPin(listatemp);
// //    setUltimoMod(bandVisible);
// //    setbandVisible(-1);
// //    //const { pins } =  usePins();
// //   });
// //   //pins = usePins().pins;
// // }, [bandVisible]);
// //console.log(listaPin);
// //console.log("Pin",pins);
//   return (
//     <div className="py-3 px-2 md:px-3 mx-auto w-full max-w-5xl">
//       <GallerySectionLayout>
//         {listaPin.map((pin:any,index) => {
//           //const pin = ?? null;
//           // pin =
//           //   pins?.filter(pin => {
//           //     return pin.index === index;
//           //   })?.[0] ?? null;
//           // 
//           return (
//             <div key={index} >
//               <GalleryDustBin
//              key={index} 
//               index={index}
//               src={pin?.src ?? null}
//               value={pin?.value ?? null}
//               type={pin?.type ?? null}
//               setbandVisible={setbandVisible}
//             />
//             </div>
//           );
//         })}
//       </GallerySectionLayout>
//     </div>
//   );
// };
