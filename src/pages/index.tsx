import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import type { ReactElement } from "react";

import { AppLayout } from "../components/AppLayout";
import { HomeScreen } from "../components/HomeScreen";

// export const Index = (): JSX.Element => {
//   return <HomeScreen />;
// };

//export default Index;

// Index.getLayout = (page: ReactElement) => {
//   return <AppLayout>{page}</AppLayout>;
// };

const Home: NextPage = () => {
  return <HomeScreen />;
}

export default Home
