import type { ReactElement } from "react";

import { AppLayout } from "../../components/AppLayout";
import { ChangelogScreen } from "../../components/ChangelogScreen";

export const changelogScreen = (): JSX.Element => {
  return < ChangelogScreen />;
};

export default changelogScreen;

changelogScreen.getLayout = (page: ReactElement) => {
  return <AppLayout>{page}</AppLayout>;
};
