import ArrowRightIcon from "@/components/SVG/ArrowRightIcon";
import Robot from "@/components/SVG/Robot";
import Star from "@/components/SVG/Star";
import { motion } from "framer-motion";
import router from "next/router";
import { useState } from "react";

const MainPage = () => {
  const [notification, setNotification] = useState(false);
  return (
    <div className="flex flex-col items-center w-full h-full gap-12 py-20 shadow-lg">
      <span className="font-PyeongChangPeace font-bold text-4xl sm:text-[48px] flex">
        너는{" "}
        <span className="relative">
          솔<Star className="absolute w-full -top-8 " />
        </span>
        <span className="relative">
          로<Star className="absolute w-full -top-8 " />
        </span>
        ?
      </span>
      <span className="font-PyeongChangPeace font-bold text-4xl sm:text-[54px] flex items-center">
        그것이 알고싶다 <span className="rotate-[12deg]">!</span>
      </span>
      <span className="sm:text-[22px] font-semibold">
        인공지능이 알려주는 내가{" "}
        <span className="text-pink-regular sm:text-[25px] ">연애</span>할
        확률은?
      </span>
      <div className="flex-auto" /> <Robot />
      <button
        className="bg-pink-regular font-semibold rounded-2xl w-[380px] h-[84px] text-[26px] flex items-center justify-center gap-2"
        type="button"
        onClick={() => {
          router.push("/select-gender");
        }}
      >
        확률 알아보기 <ArrowRightIcon />
      </button>
      <button
        className="text-[22px] mb-6 font-semibold"
        type="button"
        onClick={() => {
          if (!window || notification) return;
          navigator.clipboard.writeText(window.location.href);
          setNotification(true);
          setTimeout(() => {
            setNotification(false);
          }, 3000);
        }}
      >
        테스트 공유하기
      </button>
      {notification && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 2, easing: "easein" }}
          className={`fixed px-8 py-2 rounded-md bottom-6 bg-slate-900 `}
        >
          <span>url이 복사되었습니다.</span>
        </motion.div>
      )}
    </div>
  );
};

export default MainPage;
