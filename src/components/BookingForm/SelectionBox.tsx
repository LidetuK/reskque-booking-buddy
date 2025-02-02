import React from "react";
import { Check } from "lucide-react";

interface SelectionBoxProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const SelectionBox: React.FC<SelectionBoxProps> = ({ label, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-between
        ${
          selected
            ? "border-black bg-black text-white"
            : "border-gray-200 hover:border-black"
        }`}
    >
      <span className="text-lg font-medium">{label}</span>
      {selected && <Check className="w-6 h-6" />}
    </button>
  );
};

export default SelectionBox;