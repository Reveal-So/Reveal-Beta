import dynamic from "next/dynamic";
import Link from "next/link";
import logo3 from "../../images/logo3.png";
import { HeaderSearchBar } from "../HeaderSearchBar";
import { HeaderDropdown } from "../HeaderDropdown";
import { HeaderMobileMenu } from "../HeaderMobileMenu";


// const HeaderDropdown = dynamic(
//   () => {
//     return import("../HeaderDropdown").then(mod => {
//       return mod.HeaderDropdown;
//     });
//   },
//   {
//     ssr: false,
//   },
// );

// const HeaderMobileMenu = dynamic(
//   () => {
//     return import("../HeaderMobileMenu").then(mod => {
//       return mod.HeaderMobileMenu;
//     });
//   },
//   {
//     ssr: false,
//   },
// );

export const Header = () => {
  return (
    <>
      <div className="contenedorHeader ">
        <div className="row   ">
          <div className="col-lg-3 contenedorHeaderLogo ">
            <Link passHref href="/">
              <a className=" ">
                <img className="logo " src={logo3.src} alt="" />
              </a>
            </Link>
          </div>
          <div className="col-6 contenedorHeaderSearch text-center noVisibleMovil">
            <HeaderSearchBar />
          </div>
          <div className="col-3 contenedorHeaderGrupoIcon noVisibleMovil my-auto">
            <HeaderDropdown />
          </div>
          <HeaderMobileMenu />
        </div>
      </div>
    </>
  );
};
