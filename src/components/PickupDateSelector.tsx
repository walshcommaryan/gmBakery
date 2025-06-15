import * as React from "react";
import { useState } from "react";
import { format } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { DayPicker } from "react-day-picker";
import { motion, AnimatePresence } from "framer-motion";
import "react-day-picker/dist/style.css";

interface Props {
  value: Date | undefined;
  onChange: (date: Date) => void;
  error?: boolean;
}

export const PickupDateSelector: React.FC<Props> = ({
  value,
  onChange,
  error,
}) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onChange(date);
      setOpen(false);
    }
  };

  return (
    <div className="w-full">
      <label className="text-sm font-medium text-black mb-1 inline-block">
        Pickup Date <span className="text-red-500">*</span>
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className={`w-full bg-white border rounded-md px-4 py-2 text-sm text-black text-center hover:bg-gray-50 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            type="button"
          >
            {value ? `📅 ${format(value, "PPP")}` : "📅 Pick a Saturday"}
          </button>
        </PopoverTrigger>

        <AnimatePresence>
          {open && (
            <PopoverContent
              forceMount
              className="z-20 mt-2 rounded-md shadow p-2"
              sideOffset={5}
              asChild
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white"
              >
                <DayPicker
                  mode="single"
                  selected={value}
                  onSelect={handleSelect}
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

                    if (candidate < today) return true;

                    const thisSaturday = new Date(today);
                    thisSaturday.setDate(
                      today.getDate() + ((6 - today.getDay() + 7) % 7),
                    );
                    thisSaturday.setHours(0, 0, 0, 0);

                    const cutoff = new Date(today);
                    cutoff.setDate(
                      today.getDate() + ((3 - today.getDay() + 7) % 7),
                    );
                    cutoff.setHours(23, 59, 59, 999);

                    const isThisSaturday =
                      candidate.getTime() === thisSaturday.getTime();
                    const pastCutoff = new Date() > cutoff;

                    return isThisSaturday && pastCutoff;
                  }}
                />
              </motion.div>
            </PopoverContent>
          )}
        </AnimatePresence>
      </Popover>
    </div>
  );
};
