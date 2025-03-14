import { cn } from "@/lib/utils";
import { useState, ReactNode, useEffect } from "react";
import { ArrowBigLeft, ArrowBigLeftDash, CircleEllipsis } from "lucide-react";
import ToolTip from "./tooltipwrapper";

interface ExpandableListProps {
  children: ReactNode[];
  mappingValue?: number;
  className?: string;
}

export default function ExpandableList({ children, mappingValue = 5, className = "" }: ExpandableListProps) {
  const [visibleCount, setVisibleCount] = useState(mappingValue);

  useEffect(()=>{
    setVisibleCount(mappingValue);
  },[mappingValue])

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
          <CircleEllipsis className="text-muted-foreground hover:text-accent-foreground" onClick={showMore} />
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
