import { answersAtom, messageLoadingAtom, messagesAtom } from "@/jotai/atoms";
import { Message } from "@/types/types";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";

const Answers = () => {
  const CURRENT_TIME = new Date().toLocaleTimeString().slice(0, -3);
  const [messageLoading, setMessageLoading] = useAtom(messageLoadingAtom);
  const [answers, setAnswers] = useAtom(answersAtom);
  const [messages, setMessages] = useAtom(messagesAtom);

  useEffect(() => {
    setAnswers([{ id: 1, type: 1, content: "알겠어" }]);
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
    fetch(`/api/chatting?id=${answer.id}&type=${answer.type}`)
      .then((res) => res.json())
      .then((data) => {
        const questions = data.questions.map(
          (content: string, index: number) => ({
            role: "AI",
            profile: index === 0,
            content,
            delay: index === 0 ? 0 : index + 1,
            time: CURRENT_TIME,
          })
        );
        const answers = data.answers.map((content: string, index: number) => ({
          id: answer.id + 1,
          content: content,
          type: index + 1,
        }));
        setMessages((messages) => [...messages, ...questions]);
        setAnswers(answers);
      });

    setMessageLoading(true);
  };

  return (
    <div className="w-full mt-auto flex flex-col gap-4 p-4 bg-[#2C2C2D]">
      {answers.map((answer) => (
        <button
          key={answer.content}
          className="p-2 rounded-lg cursor-pointer bg-gray-light"
          type="button"
          disabled={messageLoading}
          onClick={() => clickAnswerButton(answer)}
        >
          {answer.content}
        </button>
      ))}
    </div>
  );
};

export default Answers;
