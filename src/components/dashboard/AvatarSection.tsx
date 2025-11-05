import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { getFirstName, getInitials } from "@/lib/utils";
import { apiEndpoints } from "@/constants/apiEndpoints";
import { Separator } from "../ui/separator";
import { useAuth } from "@/hooks/useAuth";

const AvatarSection = () => {
  const { user } = useAuth();
  return (
    <div className="space-y-4">
      <Separator className="bg-forestGreen" />
      <div className="flex items-center gap-4 pl-3.5">
        <Avatar>
          <AvatarImage src={user?.avatarUrl} />
          <AvatarFallback>{getInitials(user?.name ?? "")}</AvatarFallback>
        </Avatar>
        <span className="font-semibold">{getFirstName(user?.name ?? "")}</span>
      </div>

      <Button
        asChild
        variant="destructive"
        size="sm"
        className="justify-start w-full rounded-none gap-5.5"
      >
        <a href={apiEndpoints.auth.logout}>
          <LogOut className="size-5 ml-2" />
          <span className="font-semibold text-sm">Logout</span>
        </a>
      </Button>
    </div>
  );
};

export default AvatarSection;
