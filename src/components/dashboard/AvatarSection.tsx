import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, Monitor, Moon, Sun } from "lucide-react";
import { getFirstName, getInitials } from "@/lib/utils";
import { apiEndpoints } from "@/constants/apiEndpoints";
import { useAuth } from "@/hooks/useAuth";
import { useTheme, type Theme } from "@/hooks/useTheme";

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();

  const themeCycle: Theme[] = ["system", "light", "dark"];

  const cycleTheme = () => {
    const currentIndex = themeCycle.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeCycle.length;
    setTheme(themeCycle[nextIndex]);
  };

  const getThemeDisplay = () => {
    switch (theme) {
      case "light":
        return { Icon: Sun, label: "Light Theme" };
      case "dark":
        return { Icon: Moon, label: "Dark Theme" };
      case "system":
      default:
        return { Icon: Monitor, label: "System Theme" };
    }
  };

  const { Icon, label } = getThemeDisplay();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="justify-start w-full rounded-none gap-5.5 p-2 pl-3"
      onClick={cycleTheme}
    >
      <Icon className="size-5 ml-2" />
      <span className="text-sm">{label}</span>
    </Button>
  );
};

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

      <ThemeToggleButton />

      <Button
        asChild
        variant="ghost"
        size="sm"
        className="justify-start w-full rounded-none gap-5.5 p-2 pl-3"
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
