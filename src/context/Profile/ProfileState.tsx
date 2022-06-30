import React, { useReducer, useState } from "react";
import axios from "axios";
import ProfileContext from "./ProfileContext";
import ProfileReducer from "./ProfileReducer";

import {
  GET_USERS,
  GET_PROFILE,
  SET_ADDRESS,
  SET_IsAuthenticated,
  SET_Web3Provider,
  SET_ENS,
  SET_Followings,
  SET_Avatar,
  SET_FollowingCount,
  SET_FollowerCount,
  SET_AddressTruncated,
  SET_SocialTwitter,
} from "../types";
import { formatAddressShort } from "../../libs/utils";
//import type { IUser} from "../types"

const ProfileState = (props: any) => {
  const initialState = {
    usersConsulta: [],
    selectedUserConsulta: null,
    followingsConsulta: null,
    followersConsulta: null,
    addressConsulta: null,
    IsAuthenticatedConsulta: false,
    web3ProviderConsulta: null,
    ensConsulta: null,
    avatarConsulta: null,
    followerCountConsulta: null,
    followingCountConsulta: null,
    addressTruncatedConsulta: null,
    socialTwitterConsulta: null,
  };

  const [state, dispatch] = useReducer(ProfileReducer, initialState);

  const getUsersConsulta = async () => {
    try {
      const res: any = await axios.get("https://reqres.in/api/users");
      const data = res.data.data;
      dispatch({ type: GET_USERS, payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  const getProfileConsulta = async (id: any) => {
    try {
      const res: any = await axios.get("https://reqres.in/api/users/" + id);
      const data: any = res.data.data;
      dispatch({ type: GET_PROFILE, payload: data });
    } catch (error) {}
  };

  const setAddressConsulta = (address: any) => {
    try {
      // console.log("state.IsAuthenticated",state.IsAuthenticated);
      // console.log("state.address",state.address);
      // console.log("address",address);
      if (!state.IsAuthenticatedConsulta && address) {
        dispatch({ type: SET_ADDRESS, payload: address });
        console.log("Login address", address);
        IsAuthenticatedConsulta(true);
      } else {
        dispatch({ type: SET_ADDRESS, payload: address });
        console.log("deslogin address", address);
        IsAuthenticatedConsulta(false);
        setAddressTruncatedConsulta(null);
      }
    } catch (error) {}
  };

  const IsAuthenticatedConsulta = (band: boolean) => {
    try {
      dispatch({ type: SET_IsAuthenticated, payload: band });
      console.log("Autentico el usuario!!!");
    } catch (error) {}
  };

  const setFollowingsConsulta = (list: any) => {
    try {
      dispatch({ type: SET_Followings, payload: list });
    } catch (error) {}
  };

  const setEnsConsulta = (ens: any) => {
    try {
      dispatch({ type: SET_ENS, payload: ens });
    } catch (error) {}
  };

  const setAvatarConsulta = (avatar: any) => {
    try {
      dispatch({ type: SET_Avatar, payload: avatar });
    } catch (error) {}
  };

  const setFollowerCountConsulta= (avatar: any) => {
    try {
      dispatch({ type: SET_FollowerCount, payload: avatar });
    } catch (error) {}
  };

  const setFollowingCountConsulta = (avatar: any) => {
    try {
      dispatch({ type: SET_FollowingCount, payload: avatar });
    } catch (error) {}
  };

  const setSocialTwitterConsulta = (social: any) => {
    try {
      dispatch({ type: SET_SocialTwitter, payload: social });
    } catch (error) {}
  };
  
  const setAddressTruncatedConsulta = (address: any) => {
    try {
      if (address){
        let temp=formatAddressShort(address.toString());
        dispatch({ type: SET_AddressTruncated, payload: temp });
      }
    } catch (error) {}
  };

  return (
    <ProfileContext.Provider
      value={{
        usersConsulta: state.usersConsulta,
        selectedUserConsulta: state.selectedUserConsulta,
        followingsConsulta: state.followingsConsulta,
        web3ProviderConsulta: state.web3ProviderConsulta,
        IsAuthenticatedConsulta: state.IsAuthenticatedConsulta,
        addressConsulta: state.addressConsulta,
        followersConsulta: state.followersConsulta,
        ensConsulta: state.ensConsulta,
        avatarConsulta: state.avatarConsulta,
        followerCountConsulta: state.followerCountConsulta,
        followingCountConsulta: state.followingCountConsulta,
        addressTruncatedConsulta: state.addressTruncatedConsulta,
        socialTwitterConsulta: state.socialTwitterConsulta,
        setAvatarConsulta,
        getUsersConsulta,
        getProfileConsulta,
        setAddressConsulta,
        setEnsConsulta,
        setFollowingsConsulta,
        setFollowerCountConsulta,
        setFollowingCountConsulta,
        setAddressTruncatedConsulta,
        setSocialTwitterConsulta,
      }}>
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileState;