import { CircleMinus } from "lucide-react";
import { Pen as EditIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "./input";
import { CircleCheck as SubmitIcon } from "lucide-react";
import { CircleX as CancelIcon } from "lucide-react";

interface ChipProps {
  label: string;
  onRemove?: () => void;
  onEdit?: (input: string) => void;
}

const Chip: React.FC<ChipProps> = ({ label, onRemove, onEdit }) => {
  const [input, setInput] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);


  const handleEdit = () => {
    setInput(label);
    setIsEditing(true);
  }

  const handleSubmit = () => {
    if (onEdit) onEdit(input);
    setIsEditing(false);
    setInput("");
  }

  const handleEditCancel = () => {
    setIsEditing(false);
    setInput("");
  }

  return (
    <div className="flex items-center gap-2 h-max py-0.5 px-3 rounded-full border border-primary bg-primary-foreground text-muted-foreground">
      <span className="text-sm font-medium">{isEditing ?
        <Input name="input" value={input} onChange={(e) => { setInput(e.target.value) }} /> : label}</span>
      {!isEditing &&
        <div className="flex gap-1">
          {onEdit && <div onClick={handleEdit} className="cursor-pointer h-5 w-5 flex justify-center items-center rounded-full border-2 box-border bg-primary-foreground hover:bg-primary-foreground-hover"><EditIcon className="h-3 w-3 text-muted-foreground" /></div>}
          {onRemove && <button onClick={onRemove} className="text-red-500 cursor-pointer hover:text-red-700">
            <CircleMinus className="h-5 w-5" />
          </button>}
        </div>
      }
      {isEditing &&
        <div className="flex gap-1">
          <SubmitIcon onClick={handleSubmit} className="cursor-pointer h-5 w-5 text-muted-foreground" />
          <CancelIcon onClick={handleEditCancel} className="cursor-pointer h-5 w-5" />
        </div>
      }
    </div>
  );
};

export default Chip;
