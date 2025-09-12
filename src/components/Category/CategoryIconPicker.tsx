import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { categoryIcons } from "@/constants/categoryIcons";

type IconPickerProps = {
  value?: keyof typeof categoryIcons;
  onChange: (iconName: keyof typeof categoryIcons) => void;
};

const IconPicker = ({ value, onChange }: IconPickerProps) => {
  const [open, setOpen] = useState(false);

  const SelectedIcon = value ? categoryIcons[value] : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 w-fit">
          {SelectedIcon ? (
            <>
              <SelectedIcon className="h-5 w-5" />
            </>
          ) : (
            "Pick an Icon"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 max-h-80 overflow-y-auto">
        <div className="grid grid-cols-6 gap-3">
          {Object.entries(categoryIcons).map(([key, Icon]) => (
            <Button
              key={key}
              type="button"
              variant="outline"
              onClick={() => {
                onChange(key as keyof typeof categoryIcons);
                setOpen(false);
              }}
              className={`p-2 rounded-md border hover:bg-accent hover:text-accent-foreground transition ${
                value === key ? "bg-accent text-accent-foreground" : ""
              }`}
            >
              <Icon className="h-5 w-5 mx-auto" />
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default IconPicker;
