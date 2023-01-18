import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface Props {
  buttons: { text: string; onClick: () => void }[];
  className: string;
}

export default function Dropdown({ buttons, className }: Props) {
  return (
    <Menu as="div" className={`relative inline-block text-left ${className}`}>
      <div>
        <Menu.Button
          aria-expanded={false}
          className="inline-flex justify-center border-2 border-gray-200 w-8 h-9 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          <div className="w-full h-full flex items-center justify-center bg-slate-900">
            <ChevronDownIcon
              className="text-white h-5 w-5"
              aria-hidden="true"
            />
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer">
          {buttons.map((button, ix) => {
            return (
              <div
                className={`py-2 ${
                  ix < buttons.length - 1 ? "border-b border-black" : ""
                }`}
                key={button.text}
                onClick={button.onClick}
              >
                <Menu.Item>
                  <p className="text-black m-auto text-center">{button.text}</p>
                </Menu.Item>
              </div>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
