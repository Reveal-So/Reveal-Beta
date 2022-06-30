import type { ReactElement } from "react";

import { AppLayout } from "../../components/AppLayout";
import { ExploreScreen } from "../../components/ExploreScreen";

export const explore = (): JSX.Element => {
  return <AppLayout>< ExploreScreen />;</AppLayout>;
};

export default explore;

