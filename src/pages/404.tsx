import type { NextPage } from "next";

import { AppLayout } from "../components/AppLayout";
import { ErrorScreen } from "../components/ErrorScreen";

export const Error = () => {
  return <AppLayout><ErrorScreen /></AppLayout>;
};

export default Error;
