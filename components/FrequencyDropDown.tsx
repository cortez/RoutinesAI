import { Menu, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import { Fragment } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export type FrequencyType = "1" | "2" | "3" | "4" | "5" | "6" | "7";

interface DropDownProps {
  frequency: FrequencyType;
  setFrequency: (frequency: FrequencyType) => void;
}

let frequencies: FrequencyType[] = ["1", "2", "3", "4", "5", "6", "7"];

export default function FrequencyDropDown({ frequency, setFrequency }: DropDownProps) {
  return (
    <Menu as="div" className="relative block text-left w-full">
      <div>
        <Menu.Button className="inline-flex w-full justify-between items-center rounded-xl bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black">
          {frequency}
          <ChevronDownIcon
            className="-mr-1 ml-2 h-5 w-5 ui-open:hidden"
            aria-hidden="true"
          />
          <ChevronUpIcon
            className="-mr-1 ml-2 h-5 w-5 hidden ui-open:block"
            aria-hidden="true"
          />
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
        <Menu.Items
          className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden"
          key={frequency}
        >
          <div className="">
            {frequencies.map((frequencyItem) => (
              <Menu.Item key={frequencyItem}>
                {({ active }) => (
                  <button
                    onClick={() => setFrequency(frequencyItem)}
                    className={classNames(
                      active ? "bg-gray-200 text-gray-900" : "text-gray-700",
                      frequency === frequencyItem ? "bg-gray-100" : "bg-gray-100",
                      "px-4 py-2 text-sm w-full text-left flex items-center space-x-2 justify-between",
                    )}
                  >
                    <span>{frequencyItem}</span>
                    {frequency === frequencyItem ? (
                      <CheckIcon className="w-4 h-4 text-bold" />
                    ) : null}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}