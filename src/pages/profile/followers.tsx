import type { ReactElement } from "react";

import { AppLayout } from "../../components/AppLayout";
import { ProfileFollowersScreen } from "../../components/ProfileFollowersScreen";

export const ProfileFollowers = (): JSX.Element => {
  return <AppLayout><ProfileFollowersScreen /></AppLayout>;
};

export default ProfileFollowers;

