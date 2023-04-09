import { ReactNode, useState } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full w-full sm:max-w-[500px] m-auto text-white bg-gray-dark font-PyeongChang font-normal">
      {children}
    </div>
  );
};
export default Container;
