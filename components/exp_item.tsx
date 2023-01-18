import Image from "next/image";
import Slink from "./slink";
import useGoTo from "../hooks/useGoTo";
import { Experience } from "../types/types";
import Modal from "./modal";
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
      <p className="mr-4">{year}</p>
      <div className="flex flex-col self-stretch">
        <div
          className={`w-0.5 flex-1 mx-auto ${!first ? "bg-slate-100" : ""}`}
        />
        <div className="w-8 h-8 border-2 border-white bg-slate-600" />
        <div
          className={`w-0.5 flex-1 mx-auto ${!last ? "bg-slate-100" : ""}`}
        />
      </div>
      <div className="w-12 h-0.5 bg-white"></div>
      <div className="relative w-full p-4 my-4 border-2 border-white bg-slate-100 shadow-xl">
        <div className="flex flex-col justify-center items-center">
          <Image
            className="mb-[1.25em] cursor-pointer hover:scale-[1.02] transition-all"
            onClick={goTo(website, { newTab: true })}
            src={`/exp_logos/${logo}`}
            alt={org}
            width={200}
            height={100}
          />
          <p className="text-black mb-2 text-lg font-bold">{title}</p>
          <div className="flex w-full justify-center items-center">
            <p className="text-black m-0 mr-4">{timeframe}</p>
            <p className="text-black m-0 ml-4">{location}</p>
          </div>
        </div>
        <Slink
          type="button"
          className="absolute top-4 right-6 text-black hover:text-lime-900"
          onClick={() => {
            openMore();
          }}
        >
          More info &gt;
        </Slink>
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
