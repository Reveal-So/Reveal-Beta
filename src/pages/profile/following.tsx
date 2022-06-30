import type { ReactElement } from "react";

import { AppLayout } from "../../components/AppLayout";
import { ProfileFollowingScreen } from "../../components/ProfileFollowingScreen";

export const ProfileFollowing = (): JSX.Element => {
  return <AppLayout><ProfileFollowingScreen /></AppLayout>;
};

export default ProfileFollowing;
