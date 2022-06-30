import type { FC } from "react";

import { DndProvider } from "react-dnd";

import { HTML5Backend } from "react-dnd-html5-backend";

import { GalleryLayout } from "../GalleryLayout";
import { ProfileHero } from "../ProfileHero";
import { TabsProfiler } from "../TabsProfiler";

import img1 from "../../images/profile1.png";
import img2 from "../../images/profile2.png";
import img3 from "../../images/profile3.png";
import img4 from "../../images/profile4.png";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

import { classNames } from "../UtilComponets/className";

const PrimaryNavigation = [
  { name: "All", href: "#" },
  { name: "NFT", href: "#" },
  { name: "POAP", href: "#" },
  { name: "DAO", href: "#" },
  { name: "Mirror", href: "#" },
  { name: "DeFi", href: "#" },
];

const secondaryNavigation = [
  { name: "2022", href: "#" },
  { name: "2021", href: "#" },
  { name: "2020", href: "#" },
  { name: "2019", href: "#" },
  { name: "2018", href: "#" },
];
console.log("PrimaryNavigation:", PrimaryNavigation);


export const ProfileActiveScreen: FC = () => {
  return (
    <>
      <GalleryLayout>
        <DndProvider backend={HTML5Backend}>
          <ProfileHero />
          <TabsProfiler href={"/profile/active"} />
          <div className="contenedorTitulos sm:flex ">
            <div className="flex w-80">
              <div className="flex flex-col flex-grow  pt-5 pb-4 bg-white overflow-y-auto ">
                <div className="mt-5 flex-grow flex flex-col">
                  <nav
                    className="flex-1 px-2 space-y-8 bg-white"
                    aria-label="Sidebar"
                  >
                    <div className="space-y-1">
                      <div
                        className="space-y-1"
                        role="group"
                        aria-labelledby="projects-headline"
                      >
                        {PrimaryNavigation.map(item => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.name == "All"
                                ? " bg-[#A1A3A5] text-white"
                                : " text-[#737678] ",
                              " group flex items-center pl-10 px-3 py-2 font-medium  rounded-md ",
                              " hover:text-white hover:bg-[#A1A3A5] ",
                            )}
                          >
                            <span className="truncate tabsslidenavbar">
                              {item.name}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div
                        className="space-y-1"
                        role="group"
                        aria-labelledby="projects-headline"
                      >
                        {secondaryNavigation.map(item => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.name == "2020"
                                ? " bg-[#A1A3A5] text-white"
                                : " text-[#737678] ",
                              " group flex items-center pl-10 px-3 py-2 font-medium  rounded-md ",
                              " hover:text-white hover:bg-[#A1A3A5] ",
                            )}
                          >
                            <span className="truncate tabsslidenavbar">
                              {item.name}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
            <div className="flex w-full p-5">
              <div className="w-full">
                <ul
                  role="list"
                  className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-4 lg:gap-x-8"
                >
                  {[0, 1, 2, 3].map(index => {
                    let value, src;
                    if (index == 0) {
                      value = "FWB";
                      src = img1.src;
                    }
                    if (index == 1) {
                      value = "Launch house";
                      src = img2.src;
                    }
                    if (index == 2) {
                      value = "SushiSwap";
                      src = img3.src;
                    }
                    if (index == 3) {
                      value = "MAYC";
                      src = img4.src;
                    }
                    return (
                      <>
                        <li key={index + "a"}>
                          <div className="space-y-4  ">
                            <div className="aspect-w-3 aspect-h-3">
                              <div className="position-absolute top-0 start-0 w-100 h-100 ">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={src}
                                  alt=""
                                  className="object-cover shadow-lg rounded-lg"
                                />
                              </div>
                              <div className="position-absolute top-0 start-0 pt-4 ps-4 px-auto w-100 ">
                                <span className="  feedTituloImg  text-white ml-5 pt-3 ">
                                  {value}
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      </>
                    );
                  })}
                </ul>
                <Line options={options} data={data} />;
              </div>
            </div>
          </div>
        </DndProvider>
      </GalleryLayout>
    </>
  );
};
