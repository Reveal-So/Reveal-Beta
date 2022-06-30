
import iconoMiniUser1 from "../../images/orb1.png";
import iconoMiniUser2 from "../../images/orb2.png";
import iconoMiniUser3 from "../../images/orb3.png";
import iconoMiniUser4 from "../../images/orb4.png";
import iconoMiniUser5 from "../../images/orb5.png";
import iconoMiniUser6 from "../../images/orb6.png";
import iconoMiniUser7 from "../../images/orb7.png";
type propsFollowImg={
  arregloImg:any;
  tammano:any;
}
export const FollowImg  = ({
  arregloImg,
  tammano,
}:propsFollowImg) => {
  if (arregloImg===undefined) {
    arregloImg=[];
    arregloImg.push(iconoMiniUser1.src);
    arregloImg.push(iconoMiniUser2.src);
    arregloImg.push(iconoMiniUser3.src);
    arregloImg.push(iconoMiniUser4.src);
    arregloImg.push(iconoMiniUser5.src);
    arregloImg.push(iconoMiniUser6.src);
    arregloImg.push(iconoMiniUser7.src);
  }
  arregloImg=[];
    arregloImg.push(iconoMiniUser1.src);
    arregloImg.push(iconoMiniUser2.src);
    arregloImg.push(iconoMiniUser3.src);
    arregloImg.push(iconoMiniUser4.src);
    arregloImg.push(iconoMiniUser5.src);
    arregloImg.push(iconoMiniUser6.src);
    arregloImg.push(iconoMiniUser7.src);
  
  if (tammano===undefined) {
    tammano=8;
  }

  return (
    <>
      <div className="flex -space-x-2 ">
      {arregloImg &&
        arregloImg.map((srcIMG:any, index:any) => {
          if(tammano==8)
          return (
            <img
              className="inline-block  rounded-full ring-2 ring-white h-8 w-8"
              src={srcIMG}
              alt=""
              key={index}
            />
          );
          if(tammano==16)
          return (
            <img
              className="inline-block  rounded-full ring-2 ring-white h-14 w-14"
              src={srcIMG}
              alt=""
              key={index} 
            />
          );
        })}
      </div>
    </>
  );
};
