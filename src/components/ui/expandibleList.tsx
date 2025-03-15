import { cn } from "@/lib/utils";
import { useState, ReactNode, useEffect } from "react";
import { ArrowBigLeft, ArrowBigLeftDash, CircleEllipsis } from "lucide-react";
import ToolTip from "./tooltipwrapper";

interface ExpandableListProps {
  children: ReactNode[];
  mappingValue?: number;
  className?: string;
  total?: number | null;
}

export default function ExpandableList({ children, mappingValue = 5, className = "", total = null }: ExpandableListProps) {
  const [visibleCount, setVisibleCount] = useState(mappingValue);

  useEffect(() => {
    setVisibleCount(mappingValue);
  }, [mappingValue])

  const showMore = () => {
    setVisibleCount((prev) => prev + mappingValue);
  };

  const showLess = () => {
    setVisibleCount((prev) => prev - mappingValue);
  }

  return (
    <div className={cn(`flex gap-4 w-full flex-wrap`, className)}>
      {children.slice(0, visibleCount)}
      {visibleCount < children.length && (
        <ToolTip title="Show More">
          {total && total > 0 ?
          <div
          onClick={showMore} 
          className="flex cursor-pointer justify-center items-center font-bold h-6 w-max p-1 rounded-full border-1 border-muted-foreground text-muted-foreground hover:text-accent-foreground hover:border-accent-foreground">
            {total-visibleCount} more...
            </div>
          :
            <CircleEllipsis className="text-muted-foreground hover:text-accent-foreground" onClick={showMore}>34</CircleEllipsis>
          }
        </ToolTip>
      )}
      {(visibleCount > mappingValue) &&
        <div className="flex gap-2">
          <ToolTip title="Show Less">
            <ArrowBigLeft className="text-muted-foreground hover:text-accent-foreground" onClick={showLess} />
          </ToolTip>
          <ToolTip title="Close List">
            <ArrowBigLeftDash className="text-muted-foreground hover:text-accent-foreground" onClick={() => { setVisibleCount(mappingValue) }} />
          </ToolTip>

        </div>

      }
    </div>
  );
}
