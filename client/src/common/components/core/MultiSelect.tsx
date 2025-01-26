import { useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { Badge } from "../ui/badge";
import useClickOutside from "@/common/hooks/useClickOutside";

interface Props<T> {
  options: T[];
  getLabel?: (option: T) => string;
  getValue?: (option: T) => number;
  onSelectedChange?: (selectedIds: number[]) => void;
}

export default function MultiSelect<T>({
  options,
  getLabel = (option) => String(option),
  getValue = (option) => Number(option),
  onSelectedChange,
}: Props<T>) {
  const multiSelectRef = useRef<HTMLDivElement>(null);
  const [last, setLast] = useState("Select");
  const [selected, setSelected] = useState<T[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [open, setOpen] = useState(false);

  useClickOutside({ ref: multiSelectRef, setOpen });

  const handleAddOption = (opt: T) => {
    const val = getValue(opt);
    const exists = selectedIds.includes(val);

    let newSelectedIds: number[];
    let newSelected: T[];

    if (!exists) {
      newSelectedIds = [...selectedIds, val];
      newSelected = [...selected, opt];
    } else {
      newSelectedIds = selectedIds.filter((id) => id !== val);
      newSelected = selected.filter((item) => getValue(item) !== val);
    }

    setSelectedIds(newSelectedIds);
    setSelected(newSelected);
    setLast(getLabel(opt));

    if (onSelectedChange) {
      onSelectedChange(newSelectedIds);
    }
  };

  return (
    <>
      {selected.length > 0 && (
        <div className="w-full flex flex-wrap items-center gap-1">
          {selected.map((opt) => (
            <Badge key={getValue(opt)} className="flex items-center gap-1">
              {getLabel(opt)}
              <X
                className="w-4 h-4 cursor-pointer"
                onClick={() => handleAddOption(opt)}
              />
            </Badge>
          ))}
        </div>
      )}
      <div ref={multiSelectRef} className="w-full border rounded relative">
        <div
          onClick={() => setOpen(!open)}
          className="pl-4 pr-2 py-1 w-full flex items-center justify-between cursor-pointer"
        >
          <span>{last}</span>
          <ChevronDown
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>

        <div
          className={`
          absolute top-full w-full z-10 border rounded mt-1 
          transform origin-top transition-all duration-300 ease-out
          ${
            open
              ? "scale-100 opacity-100 visible"
              : "scale-95 opacity-0 invisible"
          }
        `}
        >
          <div className="max-h-[200px] bg-white overflow-y-auto py-2">
            {options.map((opt) => (
              <div
                key={getValue(opt)}
                onClick={() => handleAddOption(opt)}
                className={`py-1 px-4 hover:bg-gray-100 cursor-pointer flex items-center justify-between ${
                  selectedIds.includes(getValue(opt)) && "bg-gray-100"
                }`}
              >
                <span>{getLabel(opt)}</span>
                {selectedIds.includes(getValue(opt)) && <X />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
