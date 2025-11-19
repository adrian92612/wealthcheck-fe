import { createContext, useContext } from "react";

type TrashContextType = {
  forSoftDeleted: boolean;
};

export const TrashContext = createContext<TrashContextType | undefined>(
  undefined
);

export const useTrash = (): TrashContextType => {
  const context = useContext(TrashContext);
  if (!context) {
    return { forSoftDeleted: false };
  }
  return context;
};
