import type { ReactElement } from "react";

import { AppLayout } from "../../components/AppLayout";
import { GalleryPoap } from "../../components/GalleryPoap";

export const ProfilePoap = (): JSX.Element => {
  return <AppLayout><GalleryPoap /></AppLayout>;
};

export default ProfilePoap;
