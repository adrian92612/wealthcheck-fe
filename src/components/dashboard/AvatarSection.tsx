import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { getFirstName, getInitials } from "@/lib/utils";
import { apiEndpoints } from "@/constants/apiEndpoints";
import { useAuth } from "@/hooks/useAuth";

const AvatarSection = () => {
  const { user } = useAuth();
  return (
    <div className="space-y-4 py-5 border-t overflow-hidden">
      <div className="flex items-center gap-4 pl-4">
        <Avatar>
          <AvatarImage src={user?.avatarUrl} />
          <AvatarFallback>{getInitials(user?.name ?? "")}</AvatarFallback>
        </Avatar>
        <span className="font-merriweather text-sm whitespace-nowrap">
          {getFirstName(user?.name ?? "")}
        </span>
      </div>

      <Button
        asChild
        variant="ghost"
        size="sm"
        className="justify-start w-full rounded-none gap-5.5 p-2 pl-3 hover:bg-primary/5"
      >
        <a href={apiEndpoints.auth.logout}>
          <LogOut className="size-5 ml-2" />
          <span className="text-sm">Logout</span>
        </a>
      </Button>
    </div>
  );
};

export default AvatarSection;
