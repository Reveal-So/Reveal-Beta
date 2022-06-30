import type { NextPage } from "next";

import { AppLayout } from "../components/AppLayout";
import { ErrorScreen } from "../components/ErrorScreen";

export const Error: NextPage = () => {
  console.log("se ha generado un error en el sistema!!!...")
  return <AppLayout><ErrorScreen /></AppLayout>;
};

export default Error;
