import { useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import MobileNavBar from "./MobileNavBar";
import NavBar from "./NavBar";
import { menu } from "@/constants/constants";

const Sidebar = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(!isMobile);
  const toggleSidebar = () => setOpen(!open);

  const handleLinkClick = () => {
    if (!open && !isMobile) setOpen(true);
    if (open && isMobile) setOpen(false);
  };

  return (
    <>
      {isMobile ? (
        <MobileNavBar
          open={open}
          setOpen={setOpen}
          handleLinkClick={handleLinkClick}
          menu={menu}
        />
      ) : (
        <NavBar
          open={open}
          toggleSidebar={toggleSidebar}
          handleLinkClick={handleLinkClick}
          menu={menu}
        />
      )}
    </>
  );
};

export default Sidebar;
