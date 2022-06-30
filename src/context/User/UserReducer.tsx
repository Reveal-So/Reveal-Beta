import {
  GET_USERS,
  GET_PROFILE,
  SET_ADDRESS,
  SET_IsAuthenticated,
  SET_Web3Provider,
  SET_ENS,
  SET_Followings,
  SET_Avatar,
  SET_FollowerCount,
  SET_FollowingCount,
  SET_AddressTruncated,
  SET_SocialTwitter,
  SET_Pin,
} from "../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: any, action: any) => {
  const { payload, type } = action;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
      };
    case GET_PROFILE:
      return {
        ...state,
        selectedUser: payload,
      };
    case SET_ADDRESS:
      return {
        ...state,
        address: payload,
      };
    case SET_IsAuthenticated:
      return {
        ...state,
        IsAuthenticated: payload,
      };
    case SET_Web3Provider:
      return {
        ...state,
        web3Provider: payload,
      };
    case SET_ENS:
      return {
        ...state,
        ens: payload,
      };

    case SET_Followings:
      return {
        ...state,
        followings: payload,
      };

    case SET_Avatar:
      return {
        ...state,
        avatar: payload,
      };

    case SET_FollowerCount:
      return {
        ...state,
        followerCount: payload,
      };

    case SET_FollowingCount:
      return {
        ...state,
        followingCount: payload,
      };

    case SET_AddressTruncated:
      return {
        ...state,
        addressTruncated: payload,
      };

      case SET_SocialTwitter:
        return {
          ...state,
          socialTwitter: payload,
        };
        case SET_Pin:
          return {
            ...state,
            pin: payload,
          };  
    
    default:
      return state;
  }
};
