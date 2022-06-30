import type { FC } from "react";
import Link from "next/link";

const changelog = [
  {
    id: "45",
    img: "",
    titulo: "Changelog #0045",
    date: "Dec 17, 2021",
    href: "/changelog/detail",
  },
  {
    id: "46",
    img: "",
    titulo: "Changelog #0046",
    date: "Dec 17, 2021",
    href: "/changelog/detail",
  },
  {
    id: "47",
    img: "",
    titulo: "Changelog #0047",
    date: "Dec 17, 2021",
    href: "/changelog/detail",
  },
];
export const ChangelogScreen: FC = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="feedTitulo">Changelog</div>
        <div className="feedSubTitulo">
          Follow along with updates and improvements made to Light
        </div>
        <div className="feedSubTitulo">Follow us on Twitter</div>
        <div
          className="space-y-4"
          role="group"
          aria-labelledby="projects-headline"
        >
          {changelog.map(item => (
            <Link key={item.id} href={item.href}>
              <a className="">
                <div className="w-full sm:w-3/4 px-auto mx-auto  pb-3 pt-5">
                  <div className="w-full px-auto mx-auto ">
                    <div className="h-80 w-full bg-gray-300 rounded"></div>
                  </div>
                  <div className="w-full flex pt-5">
                    <div className="w-2/4 SettingSudtitulos">{item.titulo}</div>
                    <div className="w-2/4 flex flex-row-reverse">
                      {item.date}
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
