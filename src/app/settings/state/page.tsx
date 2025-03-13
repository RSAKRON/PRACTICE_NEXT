"use client";
import {
    SquarePen as EditIcon,
    Search as SearchIcon,
    Check as CheckIcon,
    X as ClearIcon,
    Plus as AddIcon,
    Trash2 as DeleteForeverIcon
} from 'lucide-react';
import { useState } from "react";
import { Table } from '@radix-ui/themes';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/ui/confirmDialogue';
import { SingleInputDialogue } from '@/components/ui/singleInputDialogue';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect } from 'react';
import { states as initialData } from '@/lib/staticData/states';
import { Pagination } from '@/components/ui/custom-pagination';

interface Column {
    id: string;
    label: string;
    minWidth?: number
    align: "center"
}

interface State {
    id: number,
    name: string,
    districts: { id: number, name: string }[]
}

export default function StateSettings() {
    const [isEditing, setIsEditing] = useState<State | null>(null);
    const [selectedState, setSelectedState] = useState<State | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(8);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [states, setStates] = useState<State[]>(initialData)
    const [filteredStates, setFilteredStates] = useState<State[] | null>(null);
    const [searchInput, setSearchInput] = useState<string>("");

    useEffect(() => {
        if (filteredStates) {
            setTotalPages(Math.ceil(filteredStates.length / itemsPerPage));
        } else {
            setTotalPages(Math.ceil(states.length / itemsPerPage))
        }
    }, [states, filteredStates, itemsPerPage])

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const columns: readonly Column[] = [
        { id: 'id', label: 'Id', minWidth: 100, align: "center" },
        { id: 'state', label: 'STATE', minWidth: 170, align: "center" },
        { id: 'actions', label: 'ACTIONS', minWidth: 100, align: "center" },
    ]


    // ###################################### Search Algorithm ######################################
    const handleSearch = () => {
        if (!searchInput.trim()) {
            setFilteredStates(null);
            return;
        }

        const lowerCaseInput = searchInput.toLowerCase();

        const filtered = states.filter(state =>
            state.name.toLowerCase().includes(lowerCaseInput) ||
            state.districts.some(district => district.name.toLowerCase().includes(lowerCaseInput))
        );
        setFilteredStates(filtered);
    };

    useEffect(() => {
        handleSearch();
    }, [searchInput])


    const handleAdd = (input: string) => {
        setStates(prevStates => {
            const newId = prevStates.length > 0 ? Math.max(...prevStates.map(s => s.id)) + 1 : 1;
            return [...prevStates, { id: newId, name: input, districts: [] }];
        });
        toast.success("Success!", {
            description: "State added Successfully."
        })
    };

    function handleDelete() {
        try {
            if (selectedState) {
                setStates(states.filter(state => state.id !== selectedState.id));
                toast.success("Success!", {
                    description: "State Deleted successfully."
                })
            }
            else {
                toast.info("Message", {
                    description: "Select a State to Delete"
                })
            }
        } catch (e) {
            if (e instanceof Error) {
                toast.error("Error", {
                    description: "An Unexpected error occured!"
                })
            }
        } finally {
            setSelectedState(null);
            setShowDeleteModal(false);
        }
    }

    function handleCancelDelete() {
        setSelectedState(null);
        setShowDeleteModal(false);
    }

    function handleCancelAdd() {
        setShowAddModal(false);
    }

    function updateStateNameById(id: number) {
        if (isEditing) {
            setStates(states.map(state =>
                state.id === id ? { ...state, name: isEditing.name || state.name } : state
            ));
            toast.success("Success!", {
                description: "State name changed successfully."
            })
        }
        setIsEditing(null);
    }



    return (
        <div className="sm:p-4 flex flex-col gap-1 box-border">
            <div className="flex text-2xl items-center gap-2 flex-col sm:flex-row sm:w-[100%] sm:box-border">
                <div className="flex pt-4 sm:pt-0 items-center">State Setting</div>
                <div className="flex flex-col flex-1 justify-center items-center gap-2 sm:justify-end sm:items-center sm:gap-1 sm:flex-row">
                    <Input placeholder='Search States or Districts' Icon={SearchIcon} name="search" className='w-[100%] sm:w-sm' value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} />
                    <Button className='flex gap-2 m-2' onClick={() => { setShowAddModal(true) }}><AddIcon /> Add State</Button>
                </div>
            </div>
            <div className='w-[100%] overflow-auto sm:shadow-none shadow-[1px_2px_8px_gray] rounded-[7px]'>
                <div className='h-[60vh] sm:h-[450] px-4 overflow-auto'>
                    <Table.Root>
                        <Table.Header>
                            <Table.Row style={{ backgroundColor: "var(--color-background)" }}>
                                {columns.map((column) => (
                                    <Table.ColumnHeaderCell
                                        key={column.id}
                                        align={column.align}
                                        style={{
                                            minWidth: column.minWidth,
                                            backgroundColor: "var(--color-background)",
                                            color: "var(--color-text)",
                                        }}
                                    >
                                        {column.label}
                                    </Table.ColumnHeaderCell>
                                ))}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {(filteredStates ? filteredStates : states).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((state) => (
                                <Table.Row role="checkbox" className='h-full' key={state.id}>
                                    <Table.RowHeaderCell className='h-full' align="center">{state.id}</Table.RowHeaderCell>
                                    <Table.Cell className='h-full' align="center">
                                        {isEditing && state.id === isEditing.id ? (
                                            <div className="flex gap-1 justify-center items-center">
                                                <Input
                                                    value={isEditing.name}
                                                    key={state.id}
                                                    name="state"
                                                    onChange={(e) => setIsEditing({ ...isEditing, name: e.target.value })}
                                                    style={{
                                                        color: "var(--color-text)",
                                                        width: "max-content",
                                                        height: "max-content"
                                                    }}
                                                />
                                                <CheckIcon onClick={() => updateStateNameById(state.id)} />
                                                <ClearIcon onClick={() => setIsEditing(null)} />
                                            </div>
                                        ) : (
                                            state.name
                                        )}
                                    </Table.Cell>
                                    <Table.Cell align="center" className="h-full">
                                        <div className='flex gap-2 justify-center items-center'>
                                            <EditIcon style={{ cursor: "pointer" }} onClick={() => setIsEditing(state)} />
                                            <DeleteForeverIcon style={{ cursor: "pointer" }} onClick={() => { setSelectedState(state); setShowDeleteModal(true); }} />
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </div>
                <Pagination
                    className='p-2'
                    currentPage={currentPage}
                    totalPages={totalPages}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={setItemsPerPage}
                />


            </div>
            <ConfirmDialog
                open={showDeleteModal}
                onConfirm={handleDelete}
                onClose={handleCancelDelete}
                title='Delete State'
                description={`Do you really want to delete state ${selectedState?.name}`}
                confirmText='Delete'
                cancelText='Cancel'
            />
            <SingleInputDialogue
                open={showAddModal}
                onConfirm={handleAdd}
                onClose={handleCancelAdd}
                title='Add State'
                description={`Type in below the name of the State`}
                confirmText='Add'
                cancelText='Cancel'
            />
        </div>
    )
}