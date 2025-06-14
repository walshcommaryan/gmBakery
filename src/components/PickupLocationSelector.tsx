// PickupLocationSelector.tsx
import * as React from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const PickupLocationSelector: React.FC<Props> = ({
  value,
  onChange,
}) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-sm text-black flex justify-between items-center">
        <Select.Value placeholder="Select Pickup Location" />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="bg-white border border-gray-300 rounded-md shadow mt-1 z-50">
          <Select.Viewport className="p-1">
            <Select.Item
              value="Wolf Ranch Farmers Market"
              className="px-3 py-2 text-sm text-black hover:bg-gray-100 rounded cursor-pointer"
            >
              <Select.ItemText>Wolf Ranch Farmers Market</Select.ItemText>
            </Select.Item>
            {/* Add more locations here if needed */}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
