import PlusIcon from "@/components/SVG/PlusIcon";
import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { progressBarAtom } from "@/jotai/atoms";
import router from "next/router";
import { NextPageWithLayout } from "@/types/types";
import ProgressBarContainer from "@/components/layout/ProgressBarContainer";

const UploadProfilePage: NextPageWithLayout = () => {
  const [, setProgress] = useAtom(progressBarAtom);

  const [image, setImage] = useState<File | null>(null);
  const [createObjectURL, setCreateObjectURL] = useState<string | null>(null);

  useEffect(() => {
    setProgress(20);
  }, []);

  const uploadToClient = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      setImage(file);
      setCreateObjectURL(URL.createObjectURL(file));
    }
  };

  const deleteOnClient = () => {
    setImage(null);
    setCreateObjectURL(null);
  };

  const uploadToServer = async () => {
    if (!image) return;

    const body = new FormData();
    body.append("file", image);
    router.push("/chatting");
  };

  return (
    <div className="flex flex-col items-center w-full h-full gap-12 py-20 shadow-lg">
      <span className="sm:text-[24px] font-semibold text-center">
        당신의 프로필 사진을 <br />
        업로드해주세요.
      </span>
      <div className="flex-auto" />{" "}
      <div className="w-full px-12">
        {createObjectURL ? (
          <img src={createObjectURL} alt="profile" className="mx-auto" />
        ) : (
          <label
            htmlFor="profile"
            className="flex items-center justify-center w-full h-56 border-2 border-white border-dashed cursor-pointer"
          >
            <input
              type="file"
              id="profile"
              className="hidden"
              accept="image/*"
              onChange={uploadToClient}
            />
            <PlusIcon />
          </label>
        )}
      </div>
      {image ? (
        <button
          type="button"
          className="bg-pink-regular rounded-2xl font-semibold px-12 py-4 text-[22px] flex"
          onClick={() => {
            uploadToServer();
          }}
        >
          다음으로
        </button>
      ) : (
        <button
          type="button"
          className=""
          onClick={() => {
            router.push("/chatting");
          }}
        >
          건너뛰기
        </button>
      )}
      <div className="flex-[2]" />
    </div>
  );
};
UploadProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <ProgressBarContainer>{page}</ProgressBarContainer>;
};
export default UploadProfilePage;
