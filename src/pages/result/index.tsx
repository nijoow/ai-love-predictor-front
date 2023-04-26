import Spinner from "@/components/SVG/Spinner";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
const ResultPage = () => {
  const [loading, setLoading] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const router = useRouter();
  const { answersNum } = router.query;
  const [results, setResults] = useState<string[]>([]);
  useEffect(() => {
    if (!answersNum) return;
    fetch(`/api/result?answersNum=${answersNum}`)
      .then((res) => res.json())
      .then((data) => setResults(data));
  }, [answersNum]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
      const controls = animate(
        count,
        Math.floor(Math.random() * (75 - 25) + 25),
        { duration: 3 }
      );

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
      <span className="text-[24px]">당신은 *** 유형!</span>
      <div className="flex flex-col gap-2 px-16 text-[16px]">
        {results.map((result, index) => (
          <span key={index}>{result}</span>
        ))}
      </div>
      <div className="flex-[2]" />
    </div>
  );
};
export default ResultPage;
