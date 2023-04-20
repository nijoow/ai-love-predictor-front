import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  answersAtom,
  genderAtom,
  messagesAtom,
  progressBarAtom,
} from "@/jotai/atoms";
import Messages from "@/components/chatting/Messages";
import Answers from "@/components/chatting/Answers";
import TodayDate from "@/components/chatting/TodayDate";
import ProgressBarContainer from "@/components/layout/ProgressBarContainer";

const today = new Date();
const INITIAL_TIME = today.toLocaleTimeString().slice(0, -3);

const ChattingPage = () => {
  const gender = useAtomValue(genderAtom);
  const [, setProgress] = useAtom(progressBarAtom);
  const [, setMessages] = useAtom(messagesAtom);

  useEffect(() => {
    setProgress(37.5);
    setMessages([
      {
        id: 0,
        role: "AI",
        profile: true,
        content: `안녕 나는 ${gender === "MALE" ? "옥순" : "영철"}이야`,
        delay: 1,
        time: INITIAL_TIME,
      },
      {
        id: 0,
        role: "AI",
        profile: false,
        content: "연애할 확률을 알고싶다 했었지?",
        delay: 2,
        time: INITIAL_TIME,
      },
      {
        id: 0,
        role: "AI",
        profile: false,
        content: "그럼 내가 몇 가지 질문을 할테니까 대답해줘!",
        delay: 3,
        time: INITIAL_TIME,
      },
    ]);
  }, []);

  return (
    <div className="flex flex-col w-full h-[calc(100%_-_76px)]">
      <TodayDate />
      <Messages />
      <Answers />
    </div>
  );
};
ChattingPage.getLayout = function getLayout(page: ReactElement) {
  return <ProgressBarContainer>{page}</ProgressBarContainer>;
};
export default ChattingPage;
