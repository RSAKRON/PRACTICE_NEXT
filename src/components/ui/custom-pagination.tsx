import { useState } from "react";
import {
  Pagination as ShadPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, Item } from "@/components/ui/custom-select";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  className?: string;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (value: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  className="",
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  const [pageInput, setPageInput] = useState<string>("");

  const maxVisiblePages = 3;
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value.replace(/\D/, ""));
  };

  const handleJumpToPage = () => {
    const pageNumber = Number(pageInput);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
      setPageInput("");
    }
  };

  return (
    <div className={cn(`flex items-center justify-between gap-4 ${className}`)}>
      {/* Items Per Page Dropdown */}
      <Select value={itemsPerPage.toString()} onChange={(value)=>{onItemsPerPageChange(parseInt(value)); onPageChange(1)}} className="w-24">
        <Item value="5">5</Item>
        <Item value="10">10</Item>
        <Item value="25">25</Item>
        <Item value="50">50</Item>
      </Select>

      {/* Pagination Controls */}
      <ShadPagination>
        <PaginationContent>
          

          {/* Previous Page */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : 1)}
              className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            />
          </PaginationItem>

          {/* Page Numbers */}
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={currentPage === page}
                onClick={() => onPageChange(page)}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Next 6 Pages Button */}
          {/* {endPage < totalPages && (
            <PaginationItem>
              <Button onClick={() => onPageChange(Math.min(totalPages, currentPage + maxVisiblePages))} ><Plus /></Button>
            </PaginationItem>
          )} */}

          {/* Next Page */}
          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
              className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </ShadPagination>

      {/* Jump to Page */}
      <div className="hidden sm:flex items-center gap-2">
        <input
          type="text"
          value={pageInput}
          onChange={handlePageInputChange}
          placeholder="Go to..."
          className="w-16 border rounded-md px-2 py-1 text-center"
        />
        <Button
          onClick={handleJumpToPage}
          className="px-3 py-1"
          disabled={!pageInput || Number(pageInput) < 1 || Number(pageInput) > totalPages}
        >
          Jump
        </Button>
      </div>
    </div>
  );
}
