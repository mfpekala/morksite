import { ReactElement, useEffect, useRef, useState } from "react";
import Navbar from "./navbar";
import Footer from "./footer";

interface LayoutProps {
  children: ReactElement;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-[rgba(0,0,0,0.8)] w-full min-h-screen flex">
      <div className="flex flex-1 flex-col p-8 sm:ml-8 md:max-w-screen-sm md:ml-16 lg:max-w-screen-md lg:ml-32 xl:max-w-screen-md xl:ml-64">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
