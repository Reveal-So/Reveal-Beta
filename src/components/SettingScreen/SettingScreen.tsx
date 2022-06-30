import type { FC } from "react";

import { Gallery } from "../Gallery";

export const SettingScreen: FC = () => {
  return (
    <>
      <div className="h-[70vh] w-full pt-[20vh]">
        <div className=" mx-auto w-full sm:w-[624px] Settingframe p-6">
          <div className="w-full SettingTitulo pt-1">Your Username</div>
          <div className="w-full SettingSudtitulos pt-4">
            This is your URL namespace within Light
          </div>
          <div className="w-full flex pt-4">
            <div className="w-1/6 ">
              <input type="text" className="SettingInput1" value={"ligth"} />
            </div>
            <div className="w-5/6 SettingSudtitulos">
              <input
                type="text"
                className="SettingInput2 w-full focus:border-amarillo-real focus:ring-amarillo-real"
                value={"ligth"}
              />
            </div>
          </div>
          <div className="w-full flex pt-5">
            <div className="w-5/6 SettingSudtitulos">
              Please use 48 charactors at maximum.
            </div>
            <div className="w-1/6 flex flex-row-reverse">
              <button className="SettingSave hover:bg-gray-800 ">save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
