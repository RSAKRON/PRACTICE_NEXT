import { Tooltip as ToolTipWrapper, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type TooltipWrapperProps = {
  title: string;
  children: React.ReactNode;
};

export default function ToolTip({ title, children }: TooltipWrapperProps) {
  return (
    <TooltipProvider>
      <ToolTipWrapper>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{title}</TooltipContent>
      </ToolTipWrapper>
    </TooltipProvider>
  );
}
