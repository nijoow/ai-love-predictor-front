import React, { ReactNode } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useAtom } from "jotai";
import { progressBarAtom } from "@/jotai/atoms";
import HeartBaloon from "@/components/SVG/HeartBaloon";

const ProgressBarContainer = ({ children }: { children: ReactNode }) => {
  const [progress] = useAtom(progressBarAtom);

  return (
    <div className="flex flex-col h-full">
      <motion.div className="w-[400px] h-3 bg-pink-lighter mt-12 mb-4 mx-auto rounded-full">
        <motion.div
          className="relative flex items-center h-full rounded-full bg-pink-light"
          animate={{ width: `${progress}%` }}
        >
          <HeartBaloon className="absolute -right-[17.5px] -top-10" />
          <motion.div className="absolute w-6 h-6 bg-white border-4 rounded-full -right-3 border-pink-light" />
        </motion.div>
      </motion.div>
      {children}
    </div>
  );
};

export default ProgressBarContainer;
