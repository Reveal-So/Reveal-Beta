import type { ReactElement } from "react";

import { AppLayout } from "../../components/AppLayout";
import { ProfileEditScreen } from "../../components/ProfileEditScreen";

export const ProfileEdit = (): JSX.Element => {
  return <AppLayout><ProfileEditScreen /></AppLayout>;
};

export default ProfileEdit;

