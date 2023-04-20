import Spinner from "@/components/SVG/Spinner";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";

const ResultPage = () => {
  const [loading, setLoading] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
      const controls = animate(count, 54, { duration: 3 });

      return controls.stop;
    }, 2500);
  }, []);

  if (!loading)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full gap-5">
        <Spinner />
        <span className=" text-[24px]">확률 계산중...</span>
      </div>
    );
  return (
    <div className="flex flex-col items-center w-full h-full gap-12 py-20 shadow-lg">
      <span className="sm:text-[24px] font-semibold text-center">
        당신이 연애할 확률은?
      </span>
      <div className="flex items-baseline justify-center w-full gap-1 font-bold text-pink-regular">
        <motion.div className="text-[96px]">{rounded}</motion.div>
        <span className="text-[64px]">%</span>
      </div>
      <span className="text-[24px]">친절하고 세심한 당신은 *** 유형!</span>
      <div className="flex-[2]" />
    </div>
  );
};
export default ResultPage;
