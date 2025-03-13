import { ContextMenu as ShadCnContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface MenuItem {
  id: number;
  name: string;
  action: () => void;
}

interface CustomContextMenuProps extends React.ComponentProps<typeof ShadCnContextMenu> {
  items: MenuItem[];
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function ContextMenu({ items, className, children, isOpen, onClose, ...props }: CustomContextMenuProps) {
  const [open, setOpen] = useState(isOpen ?? false);

  const handleClose = () => {
    if (onClose) onClose();
    setOpen(false);
  };

  return (
    <ShadCnContextMenu onOpenChange={(state) => { setOpen(state); if (!state) handleClose(); }} {...props}>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className={cn("min-w-[150px]", className)}>
        {items.map((item) => (
          <ContextMenuItem key={item.id} onSelect={() => { item.action(); handleClose(); }}>
            {item.name}
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ShadCnContextMenu>
  );
}
