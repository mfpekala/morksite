import Image from "next/image";
import Slink from "./slink";
import useGoTo from "../hooks/useGoTo";
import { Experience } from "../types/types";
import useModal from "../hooks/useModal";

export default function ExpItem({
  year,
  first,
  last,
  org,
  logo,
  website,
  title,
  timeframe,
  location,
  description,
  bullets,
}: Experience) {
  const goTo = useGoTo();
  const [MoreModal, openMore] = useModal();

  return (
    <div className="flex items-center">
      <div className="hidden sm:flex self-stretch items-center">
        <p className="mr-4">{year}</p>
        <div className="flex flex-col self-stretch">
          <div
            className={`w-0.5 flex-1 mx-auto ${
              !first ? "bg-[rgba(255,255,255,0.86)]" : ""
            }`}
          />
          <div className="w-8 h-8 border-2 border-[rgba(255,255,255,0.86)] bg-[rgba(120,120,120,0.86)]" />
          <div
            className={`w-0.5 flex-1 mx-auto ${
              !last ? "bg-[rgba(255,255,255,0.86)]" : ""
            }`}
          />
        </div>
        <div className="w-12 h-0.5 bg-[rgba(255,255,255,0.86)]"></div>
      </div>
      <div
        onClick={openMore}
        className="pointer-events-auto sm:pointer-events-none relative w-full p-4 mb-8 sm:my-4 bg-[rgba(255,255,255,0.86)] shadow-xl"
      >
        <div className="flex flex-col justify-center items-center">
          <Image
            className="mb-[1.25em] cursor-pointer pointer-events-auto hover:scale-[1.02] transition-all"
            onClick={goTo(website, { newTab: true })}
            src={`/exp_logos/${logo}`}
            alt={org}
            width={200}
            height={100}
          />
          <p className="text-black mb-2 text-lg font-bold text-center">
            {title}
          </p>
          <div className="block sm:flex w-full justify-center items-center">
            <p className="text-black m-0 sm:mr-4 text-center">{timeframe}</p>
            <p className="text-black m-0 sm:ml-4 text-center">{location}</p>
          </div>
        </div>
        <Slink
          type="button"
          className="pointer-events-auto hidden sm:block absolute top-4 right-6 text-black hover:text-lime-900"
          onClick={openMore}
        >
          More info &gt;
        </Slink>
        <div className="flex justify-center sm:hidden">
          <p className="text-xs mt-4 text-black hover:text-lime-900">
            (Tap for more info)
          </p>
        </div>
        <MoreModal>
          <p className="text-black">{description}</p>
          <ul className="list-disc mt-[0.5em]">
            {bullets.map((bullet) => (
              <li key={bullet} className="text-black ml-8">
                {bullet}
              </li>
            ))}
          </ul>
        </MoreModal>
      </div>
    </div>
  );
}
