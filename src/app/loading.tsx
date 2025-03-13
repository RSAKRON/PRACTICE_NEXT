import { cn } from "@/lib/utils";
import { LoaderCircleIcon } from "lucide-react"

function Loading() {
  return (
    <div className={cn("flex justify-center items-center w-full h-[calc(100svh-100px)]")}>
      <span className="flex items-center" aria-live="polite">
        <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </span>
    </div>
  )
}

export default Loading;