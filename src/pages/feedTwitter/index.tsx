import type { ReactElement } from "react";

import { AppLayout } from "../../components/AppLayout";
import { FeedTwitterScreen } from "../../components/FeedTwitterScreen";

export const feedTwitterScreen = (): JSX.Element => {
  return <AppLayout>< FeedTwitterScreen /></AppLayout>;
};

export default feedTwitterScreen;

