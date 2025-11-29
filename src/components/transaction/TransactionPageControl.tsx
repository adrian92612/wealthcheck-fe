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
    <div className="flex justify-between gap-5 flex-wrap items-center">
      <div className="flex items-center gap-5">
        <div className="flex flex-col gap-1">
          <Select
            value={String(filter.size)}
            onValueChange={(value) => handlePageSizeChange(Number(value))}
          >
            <SelectTrigger className="w-32 h-9">
              <SelectValue placeholder="Page size" />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n} per page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground border border-border">
          <FileText className="w-4 h-4 text-primary" />
          <span className="font-semibold text-foreground">
            {txResp.totalItems}
          </span>{" "}
          record(s)
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          className="h-9 w-9"
          disabled={filter.page === 1}
          onClick={() => handlePageChange((filter.page ?? 1) - 1)}
        >
          <ChevronLeft size={16} />
        </Button>

        <span className="text-sm font-medium text-foreground">
          Page {txResp.currentPage} of {txResp.totalPages}
        </span>

        <Button
          size="icon"
          variant="outline"
          className="h-9 w-9"
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
