import type { FC } from "react";
import membercar from "../../images/memberCar.png";


export const MemberCarScreen: FC = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8 pt-10">
        <div className="w-full px-auto mx-auto pt-32 ">
          {/* eslint-disable-next-line @next/next/no-img-element */} {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img src={membercar.src} className="memberCarImg px-auto mx-auto" />
        </div>
        <div className="w-full memberCarTitulo ">Get Membership Card</div>
        <div className="w-full memberCarSubTitulo ">
          <p>
            Required tokens not owned by address: 0x68e31b7.......fbdda68ccba8
          </p>
          <p>You must have a Membership NFT to use Light.</p>
        </div>
        <div className="w-full grid  justify-items-center"><button className="memberCarbutton hover:text-white hover:bg-gray-800 px-auto mx-auto ">Retry</button></div>
        <div className="w-full"></div>
        <div className="w-full memberCarfooter ">Join our Discord to learn more.</div>
      </div>
    </>
  );
};
