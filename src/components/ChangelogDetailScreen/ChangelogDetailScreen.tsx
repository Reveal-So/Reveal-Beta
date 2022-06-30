import type { FC } from "react";
import Link from "next/link";

export const ChangelogDetailScreen: FC = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="pt-6">
          <Link href={"/changelog"}>
            <a className="">← Projects</a>
          </Link>
        </div>
        <div className="feedTitulo">Changelog #0045</div>
        <div className="feedSubTitulo">Dec 17, 2021</div>
        <div className="w-full px-auto mx-auto pt-5">
          <div className="h-80 w-full bg-gray-300 rounded"></div>
        </div>
        <div className="space-y-8 pt-8">
          <p>Open Source Kickback</p>
          <p>
            This week we opened up early access for our open-source kickback
            program allowing open-sourcerers to monetize their projects by
            getting a cut of what we make when users host their projects on
            Railway.
          </p>
          <p>
            If you&apos;re reading this and you have an open-source project with 250+
            stars on Github, fill this form and we&apos;ll reach out to you!
          </p>
          <p>2FA Redesign</p>
          <p>
            The pressure is on, you race to open your TOTP. You look at Authy
            and see that you only 20 seconds left for your 2FA code. Wait— whats
            that? A new, better modal design for 2FA?
          </p>
          <p>
            We revamped the 2FA modal to help you be more secure, with increased
            spacing between numeral characters and automatically focused input
            to make it easier to punch in those safety numbers.
          </p>
        </div>
      </div>
    </>
  );
};
