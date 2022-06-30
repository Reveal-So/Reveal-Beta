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
} from "../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: any, action: any) => {
  const { payload, type } = action;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        usersConsulta: payload,
      };
    case GET_PROFILE:
      return {
        ...state,
        selectedUserConsulta: payload,
      };
    case SET_ADDRESS:
      return {
        ...state,
        addressConsulta: payload,
      };
    case SET_IsAuthenticated:
      return {
        ...state,
        IsAuthenticatedConsulta: payload,
      };
    case SET_Web3Provider:
      return {
        ...state,
        web3ProviderConsulta: payload,
      };
    case SET_ENS:
      return {
        ...state,
        ensConsulta: payload,
      };

    case SET_Followings:
      return {
        ...state,
        followingsConsulta: payload,
      };

    case SET_Avatar:
      return {
        ...state,
        avatarConsulta: payload,
      };

    case SET_FollowerCount:
      return {
        ...state,
        followerCountConsulta: payload,
      };

    case SET_FollowingCount:
      return {
        ...state,
        followingCountConsulta: payload,
      };

    case SET_AddressTruncated:
      return {
        ...state,
        addressTruncatedConsulta: payload,
      };

    case SET_SocialTwitter:
      return {
        ...state,
        socialTwitterConsulta: payload,
      };

    default:
      return state;
  }
};
