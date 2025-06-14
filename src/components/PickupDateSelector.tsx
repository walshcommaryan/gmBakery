// PickupDateSelector.tsx
import * as React from "react";
import { format } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface Props {
  value: Date | undefined;
  onChange: (date: Date) => void;
}

export const PickupDateSelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-sm text-black text-center hover:bg-gray-50"
          type="button"
        >
          {value ? `📅 ${format(value, "PPP")}` : "📅 Pick a Saturday"}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="z-20 mt-2 bg-white rounded-md shadow p-2"
        sideOffset={5}
      >
        <DayPicker
          mode="single"
          selected={value}
          onSelect={(date) => date && onChange(date)}
          modifiersClassNames={{
            selected: "bg-black text-white",
            today: "border border-black",
          }}
          disabled={(date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const candidate = new Date(date);
            candidate.setHours(0, 0, 0, 0);

            const isSaturday = candidate.getDay() === 6;
            if (!isSaturday) return true;

            const isToday = candidate.getTime() === today.getTime();
            if (isToday) return true;

            // Disallow any date before today
            if (candidate < today) return true;

            // Calculate this week's Saturday
            const thisSaturday = new Date(today);
            thisSaturday.setDate(
              today.getDate() + ((6 - today.getDay() + 7) % 7),
            );
            thisSaturday.setHours(0, 0, 0, 0);

            // Wednesday 11:59 PM cutoff
            const cutoff = new Date(today);
            cutoff.setDate(today.getDate() + ((3 - today.getDay() + 7) % 7)); // Next Wednesday
            cutoff.setHours(23, 59, 59, 999);

            const isThisSaturday =
              candidate.getTime() === thisSaturday.getTime();
            const pastCutoff = new Date() > cutoff;

            return isThisSaturday && pastCutoff;
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
