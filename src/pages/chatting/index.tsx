import React, { useEffect, useRef, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { genderAtom, progressBarAtom } from "@/jotai/atoms";
import Messages from "@/components/chatting/Messages";
import Answers from "@/components/chatting/Answers";
import TodayDate from "@/components/chatting/TodayDate";
import ProgressBarContainer from "@/components/layout/ProgressBarContainer";

const today = new Date();
const INITIAL_TIME = today.toLocaleTimeString().slice(0, -3);

const ChattingPage = () => {
  const gender = useAtomValue(genderAtom);
  const [, setProgress] = useAtom(progressBarAtom);

  const [messages, setMessages] = useState<
    {
      role: "USER" | "AI";
      profile?: boolean;
      content: string;
      delay: number;
      time: string;
    }[]
  >([
    {
      role: "AI",
      profile: true,
      content: `안녕 나는 ${gender === "MALE" ? "옥순" : "영철"}이야`,
      delay: 0,
      time: INITIAL_TIME,
    },
    {
      role: "AI",
      profile: false,
      content: "연애할 확률을 알고싶다 했었지?",
      delay: 1,
      time: INITIAL_TIME,
    },
    {
      role: "AI",
      profile: false,
      content: "그럼 내가 몇 가지 질문을 할테니까 대답해줘!",
      delay: 2.5,
      time: INITIAL_TIME,
    },
  ]);

  useEffect(() => {
    setProgress(37.5);
  }, []);

  return (
    <ProgressBarContainer>
      <div className="flex flex-col w-full h-[calc(100%_-_76px)]">
        <TodayDate />
        <Messages messages={messages} />
        <Answers messages={messages} setMessages={setMessages} />
      </div>
    </ProgressBarContainer>
  );
};

export default ChattingPage;
