import { categoryIcons } from "@/constants/categoryIcons";
import type { Category } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
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
import CategoryDeleteBtn from "./CategoryDeleteBtn";

type Props = {
  category: Category;
};

const CategoryCard = ({ category }: Props) => {
  const Icon: LucideIcon =
    category.icon && categoryIcons[category.icon as keyof typeof categoryIcons]
      ? categoryIcons[category.icon as keyof typeof categoryIcons]
      : categoryIcons["tag"];
  return (
    <Card className="gap-2 py-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{category.name}</CardTitle>
            <CardDescription className="text-sm text-text-muted truncate">
              {category.description}
            </CardDescription>
          </div>
          <DropdownMenu>
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
                <CategoryFormDialog category={category} />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <CategoryDeleteBtn category={category} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex justify-between gap-2 items-center">
        <span
          className={cn(
            "text-xs p-2 rounded-full inline-flex items-center gap-2",
            category.type === "INCOME"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          )}
        >
          <Icon className="size-3" />
          {capitalizeFirstLetter(category.type)}
        </span>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
