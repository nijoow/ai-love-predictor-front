import { useAtom } from "jotai";
import { genderAtom, progressBarAtom } from "@/jotai/atoms";
import Woman from "@/components/SVG/Woman";
import Man from "@/components/SVG/Man";
import { ReactElement, useEffect } from "react";
import router from "next/router";
import { NextPageWithLayout } from "@/types/types";
import ProgressBarContainer from "@/components/layout/ProgressBarContainer";

const SelectGenderPage: NextPageWithLayout = () => {
  const [, setGender] = useAtom(genderAtom);
  const [, setProgress] = useAtom(progressBarAtom);
  useEffect(() => {
    setProgress(12.5);
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-full gap-12 py-20 shadow-lg">
      <span className="sm:text-[24px] font-semibold text-center">
        연애하고 싶은 상대의 성별을 <br /> 선택해주세요.
      </span>
      <div className="flex-auto" />{" "}
      <div className="flex w-full gap-5 px-12">
        <button
          className="flex flex-col w-[380px] items-center gap-5"
          type="button"
          onClick={() => {
            setGender("MALE");
            router.push("/upload-profile");
          }}
        >
          <Man />
          <div className="bg-green-regular rounded-2xl font-semibold w-full h-[84px] text-[26px] flex items-center justify-center gap-2">
            남자
          </div>
        </button>
        <button
          className="flex flex-col w-[380px] items-center gap-5"
          type="button"
          onClick={() => {
            setGender("FEMALE");
            router.push("/upload-profile");
          }}
        >
          <Woman />
          <div className="bg-pink-regular rounded-2xl w-full font-semibold h-[84px] text-[26px] flex items-center justify-center gap-2">
            여자
          </div>
        </button>
      </div>
      <div className="flex-[2]" />
    </div>
  );
};
SelectGenderPage.getLayout = function getLayout(page: ReactElement) {
  return <ProgressBarContainer>{page}</ProgressBarContainer>;
};
export default SelectGenderPage;
