import clsx from "clsx";
import { FC, useContext, useEffect } from "react";
import { useMemo, useState } from "react";
import { useDrop } from "react-dnd";

//import { useRecoilValue } from "recoil";

import styles from "./GalleryDustBin.module.css";

//import { profileAddressAtom } from "../../atoms/profileAddress";
import { GalleryItem } from "../GalleryItem";
import type { GalleryItemProps } from "../GalleryItem";
import { createPin } from "../../libs/pin";
import type { Pin } from "../../types/pin";

//import { addressAtom } from "../../atoms/address";
import { useProfileAddress } from "../../hooks/useProfileAddress";
import { useEns } from "../../hooks/useEns";
import UserContext from "../../context/User/UserContext";
export const ItemTypes = {
  BOX: "box",
};

export type DustbinProps = GalleryItemProps & {
  index: number;
  setbandVisible?:any;
  key?:any;
};
//FC<DustbinProps> 
export const GalleryDustBin= ({index,src,value,type}:{index?:any,src?:any,value?:any,type?:any}) => {
  //const address = useRecoilValue(addressAtom);
  //const profileAddress = useRecoilValue(profileAddressAtom);
  const { address  } = useContext(UserContext);
  const [itemProps, setItemProps] = useState(null);
  const [items, setItems] = useState<any>({});
  useEffect(() => {
    setItems({index,src,value,type});
  }, []);
  // useEffect(() => {
  //   (monitor.getItem());
  // }, [items]);

  const [{ canDrop, isOver }, drop] = useDrop(() => {
    return {
      accept: ItemTypes.BOX,
      drop: (_item, monitor) => {
        //console.log("monitor.getItem()",monitor.getItem());
        setItemProps(monitor.getItem());
        const item = monitor.getItem() as Pin;
        if (!address) {
          console.log("No profileAddress attached. Returning.");
          return;
        }
        if (!item.type) {
          console.log("No type specified. Returning");
          return;
        }
        createPin(address, {
          type: item.type,
          index: index,
          src: item?.src,
          value: item?.value,
        });
        return {
          name: index,
        };
      },
      collect: (monitor: any) => {
       // console.log("monitor",monitor);
        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      },
    };
  }, [index,items]);

  const isActive = useMemo(() => {
    return canDrop && isOver;
  }, [canDrop, isOver]);
  //console.log("valores items",items)
  return (
    <>
    <div ref={drop}>
      <GalleryItem
        index={index}
        value={items.value}
        src={items.src}
        type={items.type}
        isActive={isActive}
        setItems={setItems}
        setItemProps={setItemProps}
        className={clsx(
          " ",
          canDrop && !isActive && styles["animate-shake"],
          canDrop
            ? isActive
              ? "bg-sky-300 opacity-30"
              : "bg-indigo-400 opacity-80 animate-pulse"
            : "bg-gray-200",
        )}
        {...itemProps}
      />
    </div>
    </>
  );
};

// export const GalleryDustBin2= ({index,src,value,type,setbandVisible}:{index?:any,src?:any,value?:any,type?:any,setbandVisible?:any}) => {
//   const address = useState<any>();
//   const profileAddress = useState<any>();
//   const [itemProps, setItemProps] = useState(null);
  
//   const [{ canDrop, isOver }, drop] = useDrop(() => {
//     return {
//       accept: ItemTypes.BOX,
//       drop: (_item, monitor) => {
        
//         setItemProps(monitor.getItem());
//         const item = monitor.getItem() as Pin;
//         //console.log("item",itemProps);
//         if (!profileAddress) {
//           console.log("No profileAddress attached. Returning.");
//           return;
//         }
//         if (!item.type) {
//           console.log("No type specified. Returning");
//           return;
//         }
//         createPin(profileAddress.toString(), {
//           type: item.type,
//           index: index,
//           src: item?.src,
//           value: item?.value,
//         });
//         return {
//           name: index,
//         };
//       },
//       collect: (monitor: any) => {
//        // console.log("monitor",monitor)
//         return {
//           isOver: monitor.isOver(),
//           canDrop: monitor.canDrop(),
//         };
//       },
//     };
//   }, [index]);

//   const isActive = useMemo(() => {
//     return canDrop && isOver;
//   }, [canDrop, isOver]);
  
//   return (
//     <div ref={drop}>
//       <GalleryItem
//         index={index}
//         value={value}
//         src={src}
//         type={type}
//         profileAddress={profileAddress}
//         setbandVisible={setbandVisible}
//         className={clsx(
//           " ",
//           canDrop && !isActive && styles["animate-shake"],
//           canDrop
//             ? isActive
//               ? "bg-sky-300 opacity-30"
//               : "bg-indigo-400 opacity-80 animate-pulse"
//             : "bg-gray-200",
//         )}
//         {...itemProps}
//       />
//     </div>
//   );
// };
