import type { ReactElement } from "react";

import { AppLayout } from "../../components/AppLayout";
import { GalleryFeed } from "../../components/GalleryFeed";

export const ProfileFollowers = (): JSX.Element => {
  return <AppLayout><GalleryFeed /></AppLayout>;
};

export default ProfileFollowers;
