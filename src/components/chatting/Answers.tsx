import {
  answersAtom,
  messageLoadingAtom,
  messagesAtom,
  progressBarAtom,
} from "@/jotai/atoms";
import router from "next/router";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import Spinner from "../SVG/Spinner";

const Answers = () => {
  const CURRENT_TIME = new Date().toLocaleTimeString().slice(0, -3);
  const [messageLoading, setMessageLoading] = useAtom(messageLoadingAtom);
  const [answers, setAnswers] = useAtom(answersAtom);
  const [, setMessages] = useAtom(messagesAtom);
  const [, setProgress] = useAtom(progressBarAtom);

  useEffect(() => {
    setAnswers([{ id: 1, type: 1, content: "알겠어!" }]);
  }, []);

  const clickAnswerButton = async (answer: {
    id: number;
    type: number;
    content: string;
  }) => {
    setMessages((messages) => [
      ...messages,
      {
        id: answer.id,
        profile: false,
        content: answer.content,
        role: "USER",
        delay: 0,
        time: CURRENT_TIME,
      },
    ]);
    setProgress(30 + 10 * answer.id);
    const type = [3, 5, 7].includes(answer.id) ? 1 : answer.type;
    fetch(`/api/chatting?id=${answer.id}&type=${type}`)
      .then((res) => res.json())
      .then((data) => {
        const questions = data.questions.map(
          (content: string, index: number) => ({
            role: "AI",
            profile: index === 0,
            content,
            delay: index + 1,
            time: CURRENT_TIME,
          })
        );
        const answers = data.answers
          ? data.answers.map((content: string, index: number) => ({
              id: answer.id + 1,
              content: content,
              type: index + 1,
            }))
          : null;
        setMessages((messages) => [...messages, ...questions]);
        setAnswers(answers);
        setMessageLoading(true);
      });
  };

  return (
    <div className="w-full mt-auto flex flex-col gap-4 p-4 min-h-[180px]  bg-[#2C2C2D] items-center justify-center">
      {messageLoading ? (
        <Spinner />
      ) : answers !== null ? (
        answers.map((answer) => (
          <button
            key={answer.content}
            className="w-full p-2 rounded-lg cursor-pointer bg-gray-light"
            type="button"
            disabled={messageLoading}
            onClick={() => clickAnswerButton(answer)}
          >
            {answer.content}
          </button>
        ))
      ) : (
        <button
          className="w-full p-2 rounded-lg cursor-pointer bg-gray-light"
          type="button"
          disabled={messageLoading}
          onClick={() => router.push("/result")}
        >
          결과보러가기
        </button>
      )}
    </div>
  );
};

export default Answers;
