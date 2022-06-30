import { DefaultSeo as Default } from "next-seo";
import Head from "next/head";
import type { FC } from "react";
import favicon from '../../images/favicon.png';
import pkiu from '../../images/pkiu.png';

// noindex={false}
// nofollow={false}
export const Seo: FC = () => {
  return (
    <>
      <Default
        title="Reveal - Connecting Web3 humans"
        canonical="https://www.reveal.so"
        description="A feed of wallets' on chain-activity"
        openGraph={{
          locale: "en_US",
          site_name: "reveal.so",
          type: "website",
          url: "https://www.reveal.so",
          images: [{ url: `https://www.reveal.so${pkiu.src}` }],
        }}
        twitter={{
          cardType: "summary_large_image",
          handle: "@reveal_",
          site: "@reveal_",
        }}
      />
      <Head>
        <link rel="icon" type="image/png" href={favicon.src} />
      </Head>
    </>
  );
};
