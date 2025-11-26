import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import type {
  TransactionFilterResType,
  TransactionFilterType,
} from "@/lib/types";

type Props = {
  filter: TransactionFilterType;
  txResp: TransactionFilterResType;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (size: number) => void;
};
const TransactionPageControl = ({
  filter,
  txResp,
  handlePageChange,
  handlePageSizeChange,
}: Props) => {
  return (
    <div className="flex justify-between gap-5 flex-wrap">
      <div className="flex flex-col gap-2">
        <Select
          value={String(filter.size)}
          onValueChange={(value) => handlePageSizeChange(Number(value))}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select a Type" />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50].map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n} per page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="inline-flex items-center gap-1 rounded-sm bg-secondary/30 border border-secondary/50 px-3 py-1 text-sm font-medium">
          <FileText className="w-4 h-4 opacity-70 text-primary" />
          {txResp.totalItems} record(s)
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          disabled={filter.page === 1}
          onClick={() => handlePageChange((filter.page ?? 1) - 1)}
        >
          <ChevronLeft size={16} />
        </Button>

        <span>
          {txResp.currentPage} / {txResp.totalPages}
        </span>

        <Button
          size="sm"
          disabled={filter.page === txResp.totalPages}
          onClick={() => handlePageChange((filter.page ?? 1) + 1)}
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default TransactionPageControl;
