import type { ReactElement } from "react";

import { AppLayout } from "../../components/AppLayout";
import { ProfileScreen } from "../../components/ProfileScreen";

export const Profile = () => {
  return <AppLayout><ProfileScreen /></AppLayout>;
};

export default Profile;
