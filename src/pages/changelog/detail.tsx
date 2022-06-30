import type { ReactElement } from "react";

import { AppLayout } from "../../components/AppLayout";
import { ChangelogDetailScreen } from "../../components/ChangelogDetailScreen";

export const changelogDetailScreen = (): JSX.Element => {
  return < ChangelogDetailScreen />;
};

export default changelogDetailScreen;

changelogDetailScreen.getLayout = (page: ReactElement) => {
  return <AppLayout>{page}</AppLayout>;
};
