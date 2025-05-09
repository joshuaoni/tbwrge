import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogsPaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  hasMore: boolean;
}

const BlogsPagination = ({
  currentPage,
  onPageChange,
  hasMore,
}: BlogsPaginationProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        className="rounded-full w-8 h-8 p-0 border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 shadow-none"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        tabIndex={0}
        aria-label="Previous page"
        type="button"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        className="rounded-full w-8 h-8 p-0 border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 shadow-none"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasMore}
        tabIndex={0}
        aria-label="Next page"
        type="button"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default BlogsPagination;
