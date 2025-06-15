// PickupLocationSelector.tsx
import * as React from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface Props {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export const PickupLocationSelector: React.FC<Props> = ({
  value,
  onChange,
  error,
}) => {
  return (
    <div className="w-full">
      <label className="text-sm font-medium text-black mb-1 inline-block">
        Pickup Location <span className="text-red-500">*</span>
      </label>
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger
          className={`w-full bg-white rounded-md px-4 py-2 text-sm text-black flex justify-between items-center ${
            error ? "border border-red-500" : "border border-gray-300"
          }`}
        >
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
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};
