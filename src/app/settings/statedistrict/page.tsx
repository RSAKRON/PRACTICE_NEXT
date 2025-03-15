"use client";
import {
    SquarePen as EditIcon,
    LoaderCircleIcon,
    Search as SearchIcon,
    Check as CheckIcon,
    X as ClearIcon,
    Plus as AddIcon,
    MapPinPlus,
    Trash2 as DeleteForeverIcon,
    EllipsisVertical as MenuIcon
} from 'lucide-react';
import { useState } from "react";
import { Table } from '@radix-ui/themes';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/ui/confirmDialogue';
import { SingleInputDialogue } from '@/components/ui/singleInputDialogue';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import Chip from '@/components/ui/chip';
import { states as defaultStates } from '@/lib/staticData/states';
import ExpandableList from '@/components/ui/expandibleList';
import ToolTip from '@/components/ui/tooltipwrapper';
import { AddDistrictModal } from '@/components/AddDistrictModal/AddDistrictModal';
import { Pagination } from '@/components/ui/custom-pagination';
import ContextMenu from '@/components/ui/custom-context-menu';
import { useScreenType } from '@/hooks/useScreenType';

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    className? :string;
    align: "center" | "left" | "right"
}

interface District { id: number; name: string }

interface State {
    id: number,
    name: string,
    districts: District[]
}

export default function StateDistrictSettings() {

    // State Data
    const [states, setStates] = useState<State[]>(defaultStates);
    const [isEditing, setIsEditing] = useState<State | null>(null);
    const [selectedState, setSelectedState] = useState<State | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
    const [filteredStates, setFilteredStates] = useState<State[] | null>(null);

    // Modal Data
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [showAddDistrictModal, setShowAddDistrictModal] = useState<boolean>(false);
    const [addDistrict, setAddDistrict] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    // Pagination Data
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);
    const [totalPages, setTotalPages] = useState<number>(0);

    // Utils Data
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState<string>("");
    const screenType = useScreenType();


    // Initials
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 0); // Wait for the next render cycle
        return () => clearTimeout(timer);
    }, []);


    // Pagination Functionalities
    useEffect(() => {
        if (filteredStates) {
            setTotalPages(Math.ceil(filteredStates.length / itemsPerPage));
        } else {
            setTotalPages(Math.ceil(states.length / itemsPerPage))
        }
    }, [states, filteredStates, itemsPerPage])

    const columns: readonly Column[] = [
        { id: 'id', label: 'SR No.', align: "center", className:"w-[5%] sm:w-[5%]" },
        { id: 'state', label: 'STATE', align: "center", className:"w-[30%] sm:w-[20%] break-all" },
        { id: 'districts', label: 'DISTRICTS', align: "left",className:"w-[30%] sm:w-[60%] break-all" },
        { id: 'actions', label: 'ACTIONS', align: "center", className: "hidden sm:table-cell sm:h-full w-[10%] sm:w-[15%] break-all" },
    ]


    // ###################################### Search Algorithm ######################################
    const handleSearch = () => {
        try {
            setLoading(true);
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

        } catch (error) {
            if (error instanceof Error) {
                toast.error("Error", {
                    description: error.message
                })
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleSearch();
    }, [searchInput])




    // ###################################### Add Functions ######################################
    const handleAddDistrictViaModal = (stateid: number, name: string) => {
        try {
            const requiredState = states.find(s => s.id === stateid);
            if (requiredState) {
                const newId = requiredState.districts.length > 0 ? Math.max(...requiredState.districts.map(d => d.id)) + 1 : 1;
                const updatedState = states.find(s => s.id === requiredState.id);
                if (!updatedState) {
                    throw new Error("State Not Found");
                }
                updatedState.districts.unshift({ id: newId, name: name });
            }
            toast.success("Success!", {
                description: "District added Successfully."
            });

        } catch (error) {
            toast.error("Error!", {
                description: "An unexpected Error Occured."
            });
        } finally {
            setShowAddDistrictModal(false);
        }
    }
    const handleAdd = (input: string) => {
        setLoading(true);
        try {
            if (addDistrict && selectedState) {
                let error = false;
                const newId = selectedState.districts.length > 0 ? Math.max(...selectedState.districts.map(d => d.id)) + 1 : 1;
                const updatedState = states.find(s => s.id === selectedState.id);
                if (!updatedState) {
                    throw new Error("State Not Found");
                }
                updatedState.districts.push({ id: newId, name: input });

                if (!error) toast.success("Success!", {
                    description: "District added Successfully."
                });

            } else if (!selectedState && !addDistrict) {
                setStates(prevStates => {
                    const newId = prevStates.length > 0 ? Math.max(...prevStates.map(s => s.id)) + 1 : 1;
                    return [...prevStates, { id: newId, name: input, districts: [] }];
                });
                toast.success("Success!", {
                    description: "State added Successfully."
                }
                )
            }
        } catch (e) {
            toast.error("Error!", {
                description: "An unexpected Error Occured."
            });

        } finally {
            setAddDistrict(false);
            setSelectedState(null);
            setShowAddModal(false);
            setLoading(false);
        }
    };




    // ###################################### Cancel Functions ######################################
    function handleCancelAdd() {
        if (addDistrict) {
            setAddDistrict(false);
            setSelectedState(null);
        }
        setShowAddModal(false);
    }

    function handleCancelStateDelete() {
        setSelectedState(null);
        setShowDeleteModal(false);
    }

    function handleCancelDistrictDelete() {
        setShowDeleteModal(false);
        setSelectedDistrict(null);
        setSelectedState(null);
    }




    // ###################################### Edit Functions ######################################
    function updateStateNameById(id: number) {
        setLoading(true);
        if (isEditing) {
            setStates(states.map(state =>
                state.id === id ? { ...state, name: isEditing.name || state.name } : state
            ));
            toast.success("Success!", {
                description: "State name changed successfully."
            })
        }
        setIsEditing(null);
        setLoading(false);
    }

    const editDistrict = (input: string) => {
        setLoading(true);
        if (selectedState && selectedDistrict) {
            setStates((prevStates) =>
                prevStates.map((state) =>
                    state.id === selectedState.id
                        ? {
                            ...state,
                            districts: state.districts.map((district) =>
                                district.id === selectedDistrict.id ? { ...district, name: input } : district
                            ),
                        }
                        : state
                )
            );

            setSelectedDistrict(null);
            setSelectedState(null);
            toast.success("Success!", {
                description: "District Edited SuccessFully."
            })

        }
        setLoading(false);

    };




    // ###################################### Delete Functions ######################################
    function handleStateDelete() {
        setLoading(true);
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
            setLoading(false);
        }
    }

    const deleteDistrict = () => {
        setLoading(true);
        if (selectedState && selectedDistrict) {
            setStates((prevStates) =>
                prevStates.map((state) =>
                    state.id === selectedState.id
                        ? { ...state, districts: state.districts.filter((district) => district.id !== selectedDistrict.id) }
                        : state
                )
            );
            toast.success("Success!", {
                description: "District Deleted SuccessFully."
            })
            setShowDeleteModal(false);
            setSelectedDistrict(null);
            setSelectedState(null);
        }
        setLoading(false);
    };



    return (
        <div className="sm:p-2 flex flex-col gap-1 box-border">

            {/* ###################################### Page Header ###################################### */}
            <div className="flex text-2xl items-center gap-2 flex-col sm:flex-row sm:w-[100%] sm:box-border">
                <div className="flex items-center pt-4 sm:pt-0">State and District Setting {loading && <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />}</div>
                <div className="flex flex-col flex-1 justify-center items-center gap-2 sm:justify-end sm:items-center sm:gap-1 sm:flex-row">
                    <Input placeholder='Search States or Districts' Icon={SearchIcon} name="search" className=' w-[100%] sm:w-sm' value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} />
                    <Button className='flex gap-2 m-2' onClick={() => { setShowAddDistrictModal(true) }}><AddIcon /> Add District</Button>
                </div>
            </div>

            {/* ###################################### Table with pagination ###################################### */}
            <div className='w-[100%] overflow-auto sm:shadow-none'>
                <div className='h-[60vh] sm:h-[450] px-4 overflow-auto'>
                    <Table.Root className='border-9 sm:px-4 sm:border-0  rounded-2xl'>
                        {/* ###################################### Table Columns Header ###################################### */}
                        <Table.Header>
                            <Table.Row >
                                {columns.map((column) => (
                                    <Table.ColumnHeaderCell
                                        key={column.id}
                                        align={column.align}
                                        style={{
                                            minWidth: column.minWidth,
                                            maxHeight: "5vh",
                                            backgroundColor: "var(--color-background)",
                                            color: "var(--color-text)",
                                        }}
                                        className={column.className? `${column.className}` : ""}
                                    >
                                        {column.label}
                                    </Table.ColumnHeaderCell>
                                ))}
                            </Table.Row>
                        </Table.Header>
                        {/* ###################################### Table Body ###################################### */}
                        <Table.Body className='divide-y divide-accent'>
                            {(filteredStates ? filteredStates : states).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((state, index) => (
                                <Table.Row role="checkbox" className='h-full' key={state.id}>

                                    <Table.RowHeaderCell className='h-full' align="center">{index + 1}</Table.RowHeaderCell>

                                    {/* Actions for mobile */}
                                    {/* <Table.Cell align="center" className="h-full sm:hidden">
                                        <div className="flex w-full justify-center items-center" onClick={()=>{setSelectedState(state)}}><MenuIcon /></div>
                                        <ContextMenu 
                                            items={
                                                [
                                                    {
                                                        id: 1,
                                                        name: "Edit",
                                                        action: () => setIsEditing(state)
                                                    },
                                                    {
                                                        id: 2,
                                                        name: "Delete",
                                                        action: () => { setSelectedState(state); setShowDeleteModal(true);}
                                                    },
                                                    {
                                                        id: 3,
                                                        name: "Add District",
                                                        action: () => { setSelectedState(state); setAddDistrict(true); setShowAddModal(true); }
                                                    }
                                                ]
                                            }
                                            isOpen={(selectedState && (selectedState.id === state.id))? true: false}
                                            onClose={()=>{ setSelectedState(null); }}
                                        />
                                    </Table.Cell> */}

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

                                    <Table.Cell align='left' className='h-full overflow-auto' >
                                        <ExpandableList mappingValue={(screenType==="phone")?5:10} total={state.districts.length} className='pb-4'>
                                            {state.districts.map((district, index) => <Chip key={index+1} label={district.name} onRemove={() => { setSelectedState(state); setSelectedDistrict(district); setShowDeleteModal(true); }} onEdit={(input: string) => { setSelectedDistrict(district); setSelectedState(state); editDistrict(input) }} />)}
                                        </ExpandableList>
                                        <ToolTip title='Add District'><Button className='sm:hidden flex flex-col gap-0 transition-all duration-500 bg-emerald-700 text-white hover:bg-emerald-500 text-wrap' style={{ cursor: "pointer" }} onClick={() => { setSelectedState(state); setAddDistrict(true); setShowAddModal(true); }} >Add District</Button></ToolTip>
                                    </Table.Cell>

                                    <Table.Cell align="center" className="hidden sm:table-cell sm:h-full h-full">
                                        <div className='hidden gap-2 justify-center items-center h-full sm:flex sm:flex-col sm:gap-4'>
                                            <ToolTip title='Add District'><Button className='flex flex-col gap-0 transition-all max-w-[128px] duration-500 bg-emerald-500 h-max hover:bg-emerald-600 text-white' style={{ cursor: "pointer" }} onClick={() => { setSelectedState(state); setAddDistrict(true); setShowAddModal(true); }} >Add District</Button></ToolTip>
                                            {/* <div className='flex sm:gap-2 justify-center items-center'>
                                                <ToolTip title='Edit State Name'><EditIcon style={{ cursor: "pointer" }} onClick={() => setIsEditing(state)} /></ToolTip>
                                                <ToolTip title='Delete State'><DeleteForeverIcon style={{ cursor: "pointer" }} onClick={() => { setSelectedState(state); setShowDeleteModal(true); }} /></ToolTip>
                                            </div> */}
                                        </div>
                                        <div className="sm:hidden flex w-full justify-center items-center"><MenuIcon /></div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </div>





                {/* ###################################### Pagination ###################################### */}
                <Pagination
                    className='py-4 px-8'
                    currentPage={currentPage}
                    totalPages={totalPages}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={setItemsPerPage}
                />




            </div>
            {/* ###################################### Modals and Dialog Boxes ###################################### */}
            <ConfirmDialog
                open={showDeleteModal}
                onConfirm={selectedDistrict ? deleteDistrict : handleStateDelete}
                onClose={selectedDistrict ? handleCancelDistrictDelete : handleCancelStateDelete}
                title={`Delete ${selectedDistrict ? "District" : "State"}`}
                description={`Do you really want to delete${selectedDistrict ? `district ${selectedDistrict?.name}` : `state ${selectedState?.name}`} `}
                confirmText='Delete'
                cancelText='Cancel'
            />
            <SingleInputDialogue
                open={showAddModal}
                onConfirm={handleAdd}
                onClose={handleCancelAdd}
                title={`Add ${addDistrict ? "District" : "State"}`}
                description={`Type in below the name of the ${addDistrict ? `District to add in state ${selectedState?.name}` : "State"}`}
                confirmText='Add'
                cancelText='Cancel'
            />

            <AddDistrictModal
                open={showAddDistrictModal}
                onClose={() => { setShowAddDistrictModal(false) }}
                states={states}
                onConfirm={handleAddDistrictViaModal} />
        </div>
    )
}