import React, { Fragment } from "react";
import Image from "next/image";

export const SiteLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Fragment>
      <header className="flex py-4 px-2 mb-4 border-b-1">
        <Image
          src={'/illo_starburst-logo-cursive.png'}
          alt={'Quasar Creates Logo'}
          width={300}
          height={41}
        />
      </header>
      <main className="flex justify-center sm:w-full">
        <div className="md:w-192">
          {children}
        </div>
      </main>
      <footer></footer>
    </Fragment>
  )
}
