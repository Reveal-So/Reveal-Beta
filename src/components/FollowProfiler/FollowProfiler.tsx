import { FC, useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import UserContext from "../../context/User/UserContext";
import ProfileContext from "../../context/Profile/ProfileContext";

export type Props = {
  arregloImg?: string[];
};

export const FollowProfiler: FC<Props> = (children: any) => {
  const { asPath } = useRouter();
  const { address, followerCount, followingCount } = useContext(UserContext);
  const {
    addressConsulta,
    followerCountConsulta,
    followingCountConsulta,
    ensConsulta,
  } = useContext(ProfileContext);
  const urlWallet = useMemo(() => {
    return asPath.startsWith("/profile")
      ? "profile"
      : !addressConsulta
      ? asPath
      : ensConsulta ?? addressConsulta;
  }, [asPath, addressConsulta, ensConsulta]);

  const countFollowers = useMemo(() => {
    return asPath.startsWith("/profile")
      ? !address
        ? "0"
        : followerCount
      : !addressConsulta
      ? "0"
      : followerCountConsulta;
  }, [asPath, address, followerCount, addressConsulta, followerCountConsulta]);

  const countFollowing = useMemo(() => {
    return asPath.startsWith("/profile")
      ? !address
        ? "0"
        : followingCount
      : !addressConsulta
      ? "0"
      : followingCountConsulta;
  }, [
    asPath,
    address,
    followingCount,
    addressConsulta,
    followingCountConsulta,
  ]);

  return (
    <>
      <div className="justify-center  w-full text-center pt-0">
        <div className="pt-1 w-full text-center">
          {asPath.endsWith("/followers") ? (
            ""
          ) : (
            <span>
              <span className=" text-lg text-gray-900 font-bold">
                {countFollowers}{" "}
              </span>
              <span className="text-lg">
                <Link passHref href={`/${urlWallet}/followers`}>
                  <a>Followers</a>
                </Link>
              </span>
            </span>
          )}
          {asPath.endsWith("/following") ? (
            ""
          ) : (
            <span>
              <span className="text-lg text-gray-900 font-bold">
                {" "}
                {countFollowing}{" "}
              </span>
              <span className="text-lg">
                <Link passHref href={`/${urlWallet}/following`}>
                  <a>Following</a>
                </Link>
              </span>
            </span>
          )}
        </div>
      </div>
    </>
  );
};
