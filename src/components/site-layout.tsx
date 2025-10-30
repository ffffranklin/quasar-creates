import React, { Fragment } from "react";
import Image from "next/image";

export const SiteLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Fragment>
      <header className="flex py-2 px-4 mb-4 border-b-1">
        <Image
          src={'/illo_starburst-separator-logo.png'}
          alt={'Quasar Creates Logo'}
          width={300}
          height={41}
        />
      </header>
      <main className="flex justify-center w-full">
        <div className="w-full px-4 md:w-192">
          {children}
        </div>
      </main>
      <footer></footer>
    </Fragment>
  )
}
