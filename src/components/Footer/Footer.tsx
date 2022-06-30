import type { FC } from "react";
import { FaGithub, FaDiscord, FaTwitter } from "react-icons/fa";
import twiterImg from '../../images/icon-twiter.png';
import vectorImg from '../../images/icon-vector.png';
import logoImg from '../../images/logo2.png';

import {
  DISCORD_SOCIAL_LINK,
  TWITTER_SOCIAL_LINK,
  GITHUB_SOCIAL_LINK,
  NOTION_MANIFESTO_LINK,
  // TWITTER_SHUN_LINK,
  TWITTER_JUAN_LINK,
} from "../../const/social";
//import packageJson from "../packageJson";

const navigation = {
  main: [
    {
      name: "Manifesto",
      href: NOTION_MANIFESTO_LINK,
    },
  ],
  social: [
    {
      name: "Twitter",
      href: TWITTER_SOCIAL_LINK,
      icon: (props:any) => {
        return <FaTwitter {...props} />;
      },
    },
    {
      name: "Discord",
      href: DISCORD_SOCIAL_LINK,
      icon: (props:any) => {
        return <FaDiscord {...props} />;
      },
    },
    {
      name: "Github",
      href: GITHUB_SOCIAL_LINK,
      icon: (props:any) => {
        return <FaGithub {...props} />;
      },
    },
  ],
};

export type FooterLinkProps = {
  href: string;
};
//FC<FooterLinkProps>
export const FooterLink = ( children:any, href:any ) => {
  return (
    <a
      className="hover:text-warmGray-600 dark:hover:text-warmGray-300 hover:underline"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export const Footer = () => {
  return (
    <footer>
      <div className="overflow-hidden py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl pt-3 ">
        <nav
          className="flex flex-wrap justify-center row"
          aria-label="Footer"
        >
          <div className="col-lg-12 text-center footerPosition">
          <a href={NOTION_MANIFESTO_LINK} className="linkFooter">Manifesto</a>
          
          
          </div>

          <div className="col-lg-12 text-center spacing-minimum">
            <a href={TWITTER_SOCIAL_LINK}>
          <img
            className="objCenter imgFooter"
              src={twiterImg.src}
              alt=""
            />
            </a>
          &nbsp; &nbsp; &nbsp; &nbsp;
          <a href={DISCORD_SOCIAL_LINK}>
          <img
            className="objCenter imgFooter"
              src={vectorImg.src}
              alt=""
            />
          </a>
          </div>

          <div className="col-lg-12 text-center spacing">
            <img src={logoImg.src} className="objCenter logoFooter" /> {"  "}
           <span className="textFooterCopyRight"> Copyright © 2021 Light Inc. All rights reserved.</span>
          </div>
        </nav>
      </div>
    </footer>
  );
};
