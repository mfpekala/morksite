import Image from "next/image";
import Slink from "./slink";
import useGoTo from "../hooks/useGoTo";
import { Project } from "../types/types";
import useModal from "../hooks/useModal";
import RectButton from "./rect_button";

export default function ProjItem({
  title,
  description,
  image,
  timeframe,
  liveLink,
  codeLink,
}: Project) {
  const goTo = useGoTo();

  return (
    <div className="w-full mb-8 p-8 border bg-[rgba(0,0,0,0.3)] border-white">
      <div className="flex flex-wrap sm:flex-nowrap justify-center items-center">
        <div className="mr-8">
          <p className="text-xl font-bold">{title}</p>
          <Image
            className="block my-[1.25em] sm:hidden"
            src={`/proj_imgs/${image}`}
            alt={title}
            width={200}
            height={200}
          />
          <p className="italic">{timeframe}</p>
          <p className="mb-[1.25em]">{description}</p>
          <div className="flex">
            <RectButton
              className="mr-8"
              onClick={goTo(codeLink, { newTab: true })}
            >
              View Code
            </RectButton>
            {liveLink && liveLink.length > 0 && (
              <RectButton onClick={goTo(liveLink, { newTab: true })}>
                Try it Out!
              </RectButton>
            )}
          </div>
        </div>
        <Image
          className="hidden sm:block"
          src={`/proj_imgs/${image}`}
          alt={title}
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}
