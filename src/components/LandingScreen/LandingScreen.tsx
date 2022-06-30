import iconoLogo from "../../images/Group-57.png";
import moreejemplo1 from "../../images/Group_624.png";
import moreejemplo2 from "../../images/Group_625.png";
import moreejemplo3 from "../../images/Group_626.png";
import imgejemplo1 from "../../images/Group-1.png";
import imgejemplo2 from "../../images/Group-2.png";
import imgejemplo3 from "../../images/Group-3.png";

import {
  AnnotationIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  MailIcon,
  ScaleIcon,
} from "@heroicons/react/outline";
import dynamic from "next/dynamic";
import { useContext, useEffect } from "react";
import UserContext from "../../context/User/UserContext";
import { classNames } from "../UtilComponets/className";

const navigation = [
  // {
  //   name: 'Facebook',
  //   href: '#',
  //   icon: (props) => (
  //     <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
  //       <path
  //         fillRule="evenodd"
  //         d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
  //         clipRule="evenodd"
  //       />
  //     </svg>
  //   ),
  // },
  // {
  //   name: 'Instagram',
  //   href: '#',
  //   icon: (props) => (
  //     <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
  //       <path
  //         fillRule="evenodd"
  //         d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
  //         clipRule="evenodd"
  //       />
  //     </svg>
  //   ),
  // },
  {
    name: "Twitter",
    href: "https://twitter.com/RevealSo",
    icon: (...props:any[]) => (
      // fill="currentColor"
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  },
  {
    name: 'FAQ',
    href: 'https://www.notion.so/revealso/FAQ-bfe57b288c764caeb1219e5a06302a37',
    icon: (props:any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6 mt-[2px]" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM10 7C9.63113 7 9.3076 7.19922 9.13318 7.50073C8.85664 7.97879 8.24491 8.14215 7.76685 7.86561C7.28879 7.58906 7.12543 6.97733 7.40197 6.49927C7.91918 5.60518 8.88833 5 10 5C11.6569 5 13 6.34315 13 8C13 9.30622 12.1652 10.4175 11 10.8293V11C11 11.5523 10.5523 12 10 12C9.44773 12 9.00001 11.5523 9.00001 11V10C9.00001 9.44772 9.44773 9 10 9C10.5523 9 11 8.55228 11 8C11 7.44772 10.5523 7 10 7ZM10 15C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Discord",
    href: "http://discord.gg/wqjf7trNw7",
    icon: (...props:any[]) => (
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6 " aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M18.942 5.556a16.299 16.299 0 0 0-4.126-1.297c-.178.321-.385.754-.529 1.097a15.175 15.175 0 0 0-4.573 0 11.583 11.583 0 0 0-.535-1.097 16.274 16.274 0 0 0-4.129 1.3c-2.611 3.946-3.319 7.794-2.965 11.587a16.494 16.494 0 0 0 5.061 2.593 12.65 12.65 0 0 0 1.084-1.785 10.689 10.689 0 0 1-1.707-.831c.143-.106.283-.217.418-.331 3.291 1.539 6.866 1.539 10.118 0 .137.114.277.225.418.331-.541.326-1.114.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595c.415-4.396-.709-8.209-2.973-11.589zM8.678 14.813c-.988 0-1.798-.922-1.798-2.045s.793-2.047 1.798-2.047 1.815.922 1.798 2.047c.001 1.123-.793 2.045-1.798 2.045zm6.644 0c-.988 0-1.798-.922-1.798-2.045s.793-2.047 1.798-2.047 1.815.922 1.798 2.047c0 1.123-.793 2.045-1.798 2.045z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

const posts = [
  {
    title: "Socialize-to-earn",
    href: "#",
    category: { name: "1", href: "#" },
    description: "Observers, contributors, and creators are all rewarded. ",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    imageUrl: moreejemplo1.src,
    readingTime: "6 min",
    author: {
      name: "Roel Aufderehar",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "Not your average staking",
    href: "#",
    category: { name: "2", href: "#" },
    description: "Stake your rewards in people and content. ",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
    imageUrl: moreejemplo2.src,
    readingTime: "4 min",
    author: {
      name: "Brenna Goyette",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "Spend your rewards",
    href: "#",
    category: { name: "3", href: "#" },
    description: "Use them for supercharged social interactions and access.",
    date: "Feb 12, 2020",
    datetime: "2020-02-12",
    imageUrl: moreejemplo3.src,
    readingTime: "11 min",
    author: {
      name: "Daniela Metz",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
];

const transferFeatures = [
  {
    id: 1,
    name: "Competitive exchange rates",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: GlobeAltIcon,
  },
  {
    id: 2,
    name: "No hidden fees",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: ScaleIcon,
  },
  {
    id: 3,
    name: "Transfers are instant",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: LightningBoltIcon,
  },
];
const communicationFeatures = [
  {
    id: 1,
    name: "Mobile notifications",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: AnnotationIcon,
  },
  {
    id: 2,
    name: "Reminder emails",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: MailIcon,
  },
];

const WalletConnect = dynamic<any>(() => {
    return import("../WalletConnect").then(mod => {
      return mod.WalletConnect;
    });
  },
  {
    ssr: false,
  },
);

export const LandingScreen= () => {

  return (
    <div className="adsolute top-0 bg-[#F4F2F9] h-full w-full overflow-y-scroll max-w-full">
      <div className="fixed w-full h-full top-0 bg-[#F4F2F9]">
      <div
        className="absolute blur-2xl z-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/10 to-pink-500/30 
      h-[100px] w-[100px] 
      sm:h-[200px] sm:w-[200px]
      md:h-[400px] md:w-[400px]
      lg:h-[600px] lg:w-[600px]
      xl:h-[800px] xl:w-[800px]
      2xl:h-[1000px] 2xl:w-[1000px]
      top-o sm:left-[-400px]
      left-0 overflow-hidden max-w-full
      rounded-full animate-spin-slow z-0"
      ></div>

      <div
        className="absolute blur-2xl z-0 bg-gradient-to-r from-indigo-500/30 via-purple-500/20 to-pink-500/30 
      h-[100px] w-[100px] 
      sm:h-[200px] sm:w-[200px]
      md:h-[400px] md:w-[400px]
      lg:h-[600px] lg:w-[600px]
      xl:h-[800px] xl:w-[800px]
      2xl:h-[1000px] 2xl:w-[1000px]
      top-0 right-[-400px] overflow-hidden max-w-full
      rounded-full animate-spin-slow   z-0 "
      ></div>
      <div
        className="absolute blur-2xl z-0 hidden  sm:block bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 
      h-[50px] w-[50px] 
      sm:h-[100px] sm:w-[100px]
      md:h-[300px] md:w-[300px]
      lg:h-[500px] lg:w-[500px]
      xl:h-[700px] xl:w-[700px]
      2xl:h-[900px] 2xl:w-[900px]
      top-4 right-[200px]
      2xl:blur-3xl overflow-hidden max-w-full
      rounded-full animate-spin-slow mt-64  z-0 "
      ></div>
      </div>
      
      <div className="absolute  top-0  w-full ">
        <div className="relative  overflow-hidden">
          <div className="relative pt-6 pb-16 sm:pb-24 ">
            
            {/* poper */}

            <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
              <div className="w-full pb-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="h-24 w-auto mx-auto"
                  src={iconoLogo.src}
                  alt=""
                />
              </div>
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline text-transparent bg-clip-text bg-gradient-to-r from-[#FE3A77] to-[#4845F9] ">
                  Connecting Web3 people
                  </span>
                  <span className="block xl:inline"></span>{" "}
                  {/* <span className="block text-indigo-600 xl:inline">online business</span> */}
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Follow others&apos; on-chain activity
                </p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                  <div className=" pb-2 contenedorBotonWallet  pt-8">
                    <WalletConnect
                      href={"/profile"}
                      connectedChildren={"Enter profile"}
                      className="cssBoton inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full 
              shadow-sm text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                    >
                      Connect wallet
                    </WalletConnect>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>

        <div className="pt-16 m-5 sm:m-0  overflow-hidden lg:pt-24 ">
          <div className="relative max-w-xl mx-auto pt-4 sm:pt-6 lg:pt-8 lg:max-w-7xl ">
            <div className="relative mt-3">
              <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A decentralized social graph based on who you really are
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
                Form social connections over what you own and what you have
                done, verified on-chain.
              </p>
            </div>

            <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div className="relative">
                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                  Feed
                </h3>
                <p className="mt-3 text-lg text-gray-500">
                  Follow your friends on + off chain activity
                </p>

                <div className="grid grid-rows-3 grid-flow-col gap-4 text-left">
                  <div className="mt-2  text-base text-gray-500">
                    <span className=" text-lg leading-6 font-medium text-gray-900">
                      NFT
                    </span>
                    <br />
                    See what collectors are buying
                  </div>
                  <div className="mt-2  text-base text-gray-500">
                    <span className=" text-lg leading-6 font-medium text-gray-900">
                      POAP
                    </span>
                    <br />
                    Know which events
                    <br />
                    someone has attended
                  </div>
                  <div className="mt-2  text-base text-gray-500">
                    <span className=" text-lg leading-6 font-medium text-gray-900">
                      DAO
                    </span>
                    <br />
                    Watch what proposals your friends are voting on
                  </div>
                  <div className="mt-2  text-base text-gray-500">
                    <span className=" text-lg leading-6 font-medium text-gray-900">
                      Mirror
                    </span>{" "}
                    <br />
                    Share all your articles from one place
                  </div>
                  <div className="mt-2  text-base text-gray-500">
                    <span className=" text-lg leading-6 font-medium text-gray-900">
                      Tokens
                    </span>
                    <br />
                    Don’t miss what DeFi tokens your community is buying
                  </div>
                  <div className="mt-2  text-base text-gray-500">
                    <span className=" text-lg leading-6 font-medium text-gray-900">
                      +More Soon
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-10 sm:-mx-4 relative lg:mt-0" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="relative mx-auto w-[100%] h-auto"
                  src={imgejemplo1.src}
                  alt=""
                />
              </div>
            </div>

            <div className="relative mt-12 lg:mt-24 lg:flex  lg:items-center lg:flex-row-reverse">
              <div className=" w-full sm:pl-5 ">
                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                  Profile
                </h3>
                <p className="mt-3 text-lg text-gray-500">
                  Aggregate your Web3 life in one place. Curate and show
                  everyone who you are. Express yourself with insights like
                  never before. No more need to chase cross-chain assets.
                </p>
              </div>

              <div className="w-full mt-10 lg:mt-0" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="relative mx-auto w-[490] h-auto"
                  src={imgejemplo2.src}
                  alt=""
                />
              </div>
            </div>
            <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div className="relative">
                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                Explore
                </h3>
                <p className="mt-3 text-lg text-gray-500">
                  Make new connections. Explore recommends people who have
                  shared communities. Find people and let us aggregate
                  everything they do on-chain.
                </p>
              </div>

              <div className="mt-10 sm:-mx-4 relative lg:mt-0" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="relative mx-auto w-[100%] h-auto"
                  src={imgejemplo3.src}
                  alt=""
                />
              </div>
            </div>

            <div className="relative  pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
              <div className="absolute inset-0">
                <div className=" h-1/3 sm:h-2/3" />
              </div>
              <div className="relative max-w-7xl mx-auto">
                <div className="text-center">
                  <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
                    Be part of the social economy of the future
                  </h2>
                  <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                    (Coming soon)
                  </p>
                </div>
                <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                  {posts.map((post, index) => (
                    <div
                      key={post.title}
                      className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                    >
                      <div className="flex-shrink-0 h-[300px] sm:h-[400px] itens-center bg-[#1D1A27] ">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className={classNames(
                            index == 0 && "p-4",
                            index > 0 && "pt-20",
                            "h-auto w-full object-cover",
                          )}
                          src={post.imageUrl}
                          alt=""
                        />
                      </div>
                      <div className="flex-1 bg-[#1D1A27] p-6 flex flex-col justify-between">
                        <div className="flex-1">
                          <p className="text-lg font-medium text-white bg-gray-600 pt-2 w-8 h-10 rounded-lg itens-center text-center">
                            {post.category.name}
                          </p>
                          <a href={post.href} className="block mt-2">
                            <p className="text-xl font-semibold text-white">
                              {post.title}
                            </p>
                            <p className="mt-3 text-base text-gray-300">
                              {post.description}
                            </p>
                          </a>
                        </div>
                       
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="">
              <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  <span className="block">Reveal who you are.</span>
                  <span className="block">Enter now.</span>
                </h2>
                <div className="mt-8 flex justify-center">
                  {/* <WalletConnect2
                    href="/profile"
                    connectedChildren="Enter profile"
                    className="cssBoton inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full 
              shadow-sm text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                  >
                    Connect wallet
                  </WalletConnect2> */}
                </div>
              </div>
            </div>

            <div className="relative">
              <footer className="">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
                  <div className="flex justify-center space-x-6 md:order-2">
                    {navigation.map(item => (
                      <a
                        key={item.name}
                        target={"_blank"}
                        rel="noreferrer"
                        href={item.href}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">{item.name}</span>
                        <item.icon />
                      </a>
                    ))}
                  </div>
                  <div className="mt-8 md:mt-0 md:order-1">
                    <p className="text-center text-base text-gray-400">
                      &copy; 2022 Reveal So Inc. All rights reserved.
                    </p>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  };
