import React, { useReducer, useState } from "react";
import axios from "axios";

import UserContext from "./UserContext";
import UserReducer from "./UserReducer";

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
  SET_Pin,
} from "../types";
import { formatAddressShort } from "../../libs/utils";
//import type { IUser} from "../types"

const UserState = (props: any) => {
  const initialState = {
    users: [],
    selectedUser: null,
    followings: null,
    followers: null,
    address: null,
    IsAuthenticated: false,
    web3Provider: null,
    ens: null,
    avatar: null,
    followerCount: null,
    followingCount: null,
    addressTruncated: null,
    socialTwitter: null,
    pin: null,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const getUsers = async () => {
    try {
      const res: any = await axios.get("https://reqres.in/api/users");
      const data = res.data.data;
      dispatch({ type: GET_USERS, payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  const getProfile = async (id: any) => {
    try {
      const res: any = await axios.get("https://reqres.in/api/users/" + id);
      const data: any = res.data.data;
      dispatch({ type: GET_PROFILE, payload: data });
    } catch (error) {}
  };

  const setAddress = (address: any) => {
    try {
      // console.log("state.IsAuthenticated",state.IsAuthenticated);
      // console.log("state.address",state.address);
      // console.log("address",address);
      if (!state.IsAuthenticated && address) {
        dispatch({ type: SET_ADDRESS, payload: address });
        //dispatch({ type: SET_ADDRESS, payload: "0xc9a4679aD41D81A2FE0F1A6E9353565Ce734D3F6" });
        console.log("Login address", address);
        IsAuthenticated(true);
      } else {
        dispatch({ type: SET_ADDRESS, payload: address });
        console.log("deslogin address", address);
        IsAuthenticated(false);
        setAddressTruncated(null);
      }
    } catch (error) {}
  };

  const IsAuthenticated = (band: boolean) => {
    try {
      dispatch({ type: SET_IsAuthenticated, payload: band });
      console.log("Autentico el usuario!!!");
    } catch (error) {}
  };

  const setWeb3Provider = (Provider: any) => {
    try {
      dispatch({ type: SET_Web3Provider, payload: Provider });
    } catch (error) {}
  };

  const setFollowings = (list: any) => {
    try {
      dispatch({ type: SET_Followings, payload: list });
    } catch (error) {}
  };

  const setEns = (ens: any) => {
    try {
      dispatch({ type: SET_ENS, payload: ens });
    } catch (error) {}
  };

  const setPin = (pin: any) => {
    try {
      dispatch({ type: SET_Pin, payload: pin });
    } catch (error) {}
  };

  const setAvatar = (avatar: any) => {
    try {
      dispatch({ type: SET_Avatar, payload: avatar });
    } catch (error) {}
  };

  const setFollowerCount = (avatar: any) => {
    try {
      dispatch({ type: SET_FollowerCount, payload: avatar });
    } catch (error) {}
  };

  const setFollowingCount = (avatar: any) => {
    try {
      dispatch({ type: SET_FollowingCount, payload: avatar });
    } catch (error) {}
  };

  const setSocialTwitter = (social: any) => {
    try {
      dispatch({ type: SET_SocialTwitter, payload: social });
    } catch (error) {}
  };
  
  const setAddressTruncated = (address: any) => {
    try {
      if (address){
        let temp=formatAddressShort(address.toString());
        dispatch({ type: SET_AddressTruncated, payload: temp });
      }
    } catch (error) {}
  };

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        selectedUser: state.selectedUser,
        followings: state.followings,
        web3Provider: state.web3Provider,
        IsAuthenticated: state.IsAuthenticated,
        address: state.address,
        followers: state.followers,
        ens: state.ens,
        avatar: state.avatar,
        followerCount: state.followerCount,
        followingCount: state.followingCount,
        addressTruncated: state.addressTruncated,
        socialTwitter: state.socialTwitter,
        pin: state.pin,
        setPin,
        setAvatar,
        getUsers,
        getProfile,
        setAddress,
        setWeb3Provider,
        setEns,
        setFollowings,
        setFollowerCount,
        setFollowingCount,
        setAddressTruncated,
        setSocialTwitter,
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
