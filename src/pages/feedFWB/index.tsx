import type { ReactElement } from "react";

import { AppLayout } from "../../components/AppLayout";
import { FeedFWBScreen } from "../../components/FeedFWBScreen";

export const feedFWBScreen = (): JSX.Element => {
  return <AppLayout>< FeedFWBScreen /></AppLayout>;
};

export default feedFWBScreen;

