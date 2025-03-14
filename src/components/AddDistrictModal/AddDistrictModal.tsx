'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Item, Select } from "@/components/ui/custom-select";

interface District { id: number; name: string }

interface State {
    id: number,
    name: string,
    districts: District[]
}

interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (stateid: number, name: string) => void;
    states: State[],
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
}


export function AddDistrictModal({
    open,
    onClose,
    onConfirm,
    states,
    title = "Add District",
    description = "Select a State and then type in the name of the state you want to add.",
    confirmText = "Add",
    cancelText = "Cancel"
}: ConfirmDialogProps) {
    const [input, setInput] = useState<string>("");
    const [ selectedState, setSelectedState ] = useState<number | null>(null);

    const handleConfirm = () => {
        if (!input || !selectedState) {
            toast.error("Hello", {
                description: "Please fill the input to proceed."
            })
            return;
        }
        onConfirm(selectedState,input);
        onClose();
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle>Add District</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <div>Select a State and type in the name of the state you want to add.</div>
                    <Select placeholder="Select a State" className="w-full" onChange={(value)=>{setSelectedState(parseInt(value))}} value={selectedState?.toString() ?? ""}>
                        {states.map(state => <Item key={state.id} value={`${state.id}`}>{state.name}</Item>)}
                    </Select>
                    <Input name="input" onChange={(e) => { setInput(e.target.value) }} />
                </div>
                <DialogFooter className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>{cancelText}</Button>
                    <Button disabled={((selectedState !== null) && (input.length > 0)) ? false: true} onClick={handleConfirm}>{confirmText}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
