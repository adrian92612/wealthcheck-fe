import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn, formatNumber } from "@/lib/utils";

type Props = {
  title: string;
  description: string;
  icon: React.ElementType;
  totalBalance: number;
  cardCN?: string;
  iconCN?: string;
  contentCN?: string;
};

const StatCard = ({
  title,
  description,
  icon,
  totalBalance,
  cardCN,
  iconCN,
  contentCN,
}: Props) => {
  const Icon = icon;
  return (
    <Card className={cn("w-full max-w-xl mx-auto justify-between", cardCN)}>
      <CardHeader>
        <div className="flex items-center justify-between gap-5">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="italic">{description}</CardDescription>
          </div>
          <Icon className={cn("size-6 text-forestGreen", iconCN)} />
        </div>
      </CardHeader>
      <CardContent
        className={cn(
          "text-2xl lg:text-4xl font-bold font-merriweather italic",
          contentCN
        )}
      >
        {formatNumber(totalBalance)}
      </CardContent>
    </Card>
  );
};

export default StatCard;
