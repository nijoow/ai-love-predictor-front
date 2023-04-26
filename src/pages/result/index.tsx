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
        {results.map((result, index) =>
          result ? (
            <p key={index}>{`\u00A0${result}`}</p>
          ) : (
            <p key={index}>
              하지만, 이러한 특성들은 각각이 연애 성향을 결정하는 데 영향을
              미치는 것이 아니라, 개인의 특성과 경험, 환경적인 요인,성격적 특성,
              가족, 친구, 문화적 배경 등 다양한 요인이 영향을 미칩니다. 그래서
              위의 응답 과 별개로 자신의 장단점을 알고, 상대방을 존중하고
              이해하며, 서로를 위한 노력을 기울인다면 좋은 인간관계를 유지하고,
              성공적인 연애를 할 수 있을 것입니다.
            </p>
          )
        )}
      </div>
      <div className="flex-[2]" />
    </div>
  );
};
export default ResultPage;
