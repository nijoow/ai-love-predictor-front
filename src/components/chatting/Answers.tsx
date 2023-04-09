import { messageLoadingAtom } from "@/jotai/atoms";
import { Message } from "@/types/types";
import { useAtom } from "jotai";
import React from "react";

const Answers = ({
  messages,
  setMessages,
}: {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}) => {
  const CURRENT_TIME = new Date().toLocaleTimeString().slice(0, -3);
  const [messageLoading, setMessageLoading] = useAtom(messageLoadingAtom);

  return (
    <div className="w-full mt-auto flex flex-col gap-4 p-4 bg-[#2C2C2D]">
      <button
        className="p-2 rounded-lg cursor-pointer bg-gray-light"
        type="button"
        disabled={messageLoading}
        onClick={() => {
          setMessages([
            ...messages,
            {
              role: "USER",
              content: "알겠어!",
              delay: 0,
              time: CURRENT_TIME,
            },
          ]);
          setMessageLoading(true);
        }}
      >
        알겠어!
      </button>{" "}
    </div>
  );
};

export default Answers;
