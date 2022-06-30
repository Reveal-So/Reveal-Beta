import type { ReactElement } from "react";

import { AppLayout } from "../../components/AppLayout";
import { FeedLaunchScreen } from "../../components/FeedLaunchScreen";

export const feedLaunchScreen = (): JSX.Element => {
  return <AppLayout>< FeedLaunchScreen /></AppLayout>;
};

export default feedLaunchScreen;

