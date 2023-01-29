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

export type EquipmentType = "Any Equipment" | "Dumbbells Only" | "Pull-up Bar" | "Resistance Bands" | "No Equipment";

interface DropDownProps {
  equipment: EquipmentType;
  setEquipment: (equipment: EquipmentType) => void;
}

let frequencies: EquipmentType[] = ["Any Equipment", "Dumbbells Only", "Pull-up Bar", "Resistance Bands", "No Equipment"];

export default function EquipmentDropDown({ equipment, setEquipment }: DropDownProps) {
  return (
    <Menu as="div" className="relative block text-left w-full">
      <div>
        <Menu.Button className="inline-flex w-full justify-between items-center rounded-xl bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 ring-gray-100 focus:ring-lime-400">
          {equipment}
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
          className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-xl bg-white shadow-lg focus:outline-none overflow-hidden"
          key={equipment}
        >
          <div className="">
            {frequencies.map((equipmentItem) => (
              <Menu.Item key={equipmentItem}>
                {({ active }) => (
                  <button
                  onClick={() => setEquipment(equipmentItem)}
                  className={classNames(
                    active ? "bg-lime-400 text-gray-900" : "text-gray-700 ",
                    "px-4 py-3 text-sm w-full text-left flex items-center space-x-2 justify-between",
                  )}
                >
                    <span>{equipmentItem}</span>
                    {equipment === equipmentItem ? (
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
