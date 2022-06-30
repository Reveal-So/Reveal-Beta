import type { ReactElement } from "react";

import { AppLayout } from "../../components/AppLayout";
import { FeedScreen } from "../../components/FeedScreen";

export const feedScreen = (): JSX.Element => {
  return <AppLayout>< FeedScreen /></AppLayout>;
};

export default feedScreen;

// feedScreen.getLayout = (page: ReactElement) => {
//   return 
// };
