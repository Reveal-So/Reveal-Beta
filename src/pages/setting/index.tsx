import type { ReactElement } from "react";

import { AppLayout } from "../../components/AppLayout";
import { SettingScreen } from "../../components/SettingScreen";

export const settingScreen = (): JSX.Element => {
  return < SettingScreen />;
};

export default settingScreen;

settingScreen.getLayout = (page: ReactElement) => {
  return <AppLayout>{page}</AppLayout>;
};
