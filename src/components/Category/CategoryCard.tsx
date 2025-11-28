import { categoryIcons } from "@/constants/categoryIcons";
import type { Category } from "@/lib/types";
import { Card, CardDescription, CardTitle } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { MoreVertical, type LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import CategoryFormDialog from "./CategoryFormDialog";
import { useTrash } from "@/hooks/useIsTrash";
import RestoreBtn from "../common/RestoreBtn";
import { categoryApi } from "@/lib/api";
import { qCacheKey } from "@/constants/queryKeys";
import DeleteBtn from "../common/DeleteBtn";
import { useState, useMemo } from "react";

type Props = {
  category: Category;
};

const CategoryCard = ({ category }: Props) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const { forSoftDeleted } = useTrash();
  const keysToInvalidate = [qCacheKey.categories, qCacheKey.trashedCategories];

  const Icon: LucideIcon = useMemo(
    () =>
      (category.icon &&
        categoryIcons[category.icon as keyof typeof categoryIcons]) ||
      categoryIcons["tag"],
    [category.icon]
  );

  const colorClasses = useMemo(() => {
    return category.type === "INCOME"
      ? {
          bg: "bg-primary/10",
          text: "text-primary",
          ring: "ring-primary/50",
        }
      : {
          bg: "bg-destructive/10",
          text: "text-destructive",
          ring: "ring-destructive/50",
        };
  }, [category.type]);

  return (
    <Card className="shadow-md transition-shadow hover:shadow-lg h-full">
      <div className="flex justify-between items-start p-4">
        <div className="flex items-start gap-3 w-full min-w-0">
          <div
            className={cn(
              "flex items-center justify-center p-2 rounded-xl h-10 w-10 shrink-0 ring-2",
              colorClasses.bg,
              colorClasses.ring
            )}
          >
            <Icon className={cn("size-5", colorClasses.text)} />
          </div>

          <div className="min-w-0 flex-1">
            <CardTitle className="text-base truncate">
              {category.name}
            </CardTitle>
            <CardDescription className="text-sm truncate text-muted-foreground">
              {category.description || "No description provided."}
            </CardDescription>
          </div>
        </div>

        <DropdownMenu open={openDropDown} onOpenChange={setOpenDropDown}>
          <DropdownMenuTrigger asChild className="hover:cursor-pointer">
            <Button
              variant="ghost"
              size="icon"
              className="p-1 size-7 rounded-full hover:bg-muted"
            >
              <MoreVertical size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="text-center">
              More Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              {forSoftDeleted ? (
                <RestoreBtn
                  id={category.id}
                  label="category"
                  name={category.name}
                  restoreFn={categoryApi.restore}
                  invalidateKeys={keysToInvalidate}
                />
              ) : (
                <CategoryFormDialog
                  category={category}
                  closeDropDown={() => setOpenDropDown(false)}
                />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DeleteBtn
                id={category.id}
                label="category"
                name={category.name}
                softDeleteFn={categoryApi.delete}
                deleteFn={categoryApi.permanentDelete}
                invalidateKeys={keysToInvalidate}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="px-4 pb-4 pt-0">
        <span
          className={cn(
            "text-xs font-medium px-3 py-1 rounded-full",
            colorClasses.bg,
            colorClasses.text
          )}
        >
          {capitalizeFirstLetter(category.type)}
        </span>
      </div>
    </Card>
  );
};

export default CategoryCard;
