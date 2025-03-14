'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { Input } from "./input";
import { toast } from "sonner";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (input: string) => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

export function SingleInputDialogue({
  open,
  onClose,
  onConfirm,
  title = "Take Input",
  description = "Add Input",
  confirmText = "Yes",
  cancelText = "No"
}: ConfirmDialogProps) {
  const [input, setInput] = useState<string>("");

  const handleConfirm = () => {
    if (!input) {
      toast.error("Hello", {
        description: "Please fill the input to proceed."
      })
      return;
    }
    onConfirm(input);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-1">
          {description}
          <Input name="input" onChange={(e) => { setInput(e.target.value) }} />
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>{cancelText}</Button>
          <Button onClick={handleConfirm}>{confirmText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
