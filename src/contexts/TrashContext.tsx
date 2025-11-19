import { TrashContext } from "@/hooks/useIsTrash";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  forSoftDeleted?: boolean;
};

export const TrashProvider = ({ children, forSoftDeleted = true }: Props) => {
  return (
    <TrashContext.Provider value={{ forSoftDeleted }}>
      {children}
    </TrashContext.Provider>
  );
};
