import { type ReactNode } from "react";

const BottomRightActions = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-card/60 backdrop-blur-md rounded-full p-1 shadow-elegant border border-cream/20 hover:bg-card/80 transition-all duration-300">
        <div className="flex flex-col items-center gap-1">{children}</div>
      </div>
    </div>
  );
};

export default BottomRightActions;
