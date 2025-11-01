import React, { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const SiteLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Fragment>
      <header className="flex py-2 px-4 mb-4 border-b-1">
        <Link href="/">
          <Image
            src={'/illo_starburst-separator-logo.png'}
            alt={'Quasar Creates Logo'}
            width={250}
            height={40}
          />
        </Link>
      </header>
      <main className="flex justify-center w-full">
        <div className="w-full px-4 lg:w-192">{children}</div>
      </main>
      <footer></footer>
    </Fragment>
  );
};
