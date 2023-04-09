import { genderAtom, messageLoadingAtom } from "@/jotai/atoms";
import { Message } from "@/types/types";
import { motion } from "framer-motion";
import { useAtomValue, useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";

const Messages = ({ messages }: { messages: Message[] }) => {
  const ref = useRef<null | HTMLDivElement>(null);
  const gender = useAtomValue(genderAtom);
  const [, setMessageLoading] = useAtom(messageLoadingAtom);
  const scrollToBottom = () => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
    setMessageLoading(true);
  }, [messages]);

  return (
    <div
      className="flex flex-col w-full pl-4 pr-2 overflow-y-scroll custom-scroll"
      ref={ref}
    >
      {messages.map((message, index) => {
        if (message.role === "AI")
          return (
            <div className="flex gap-4" key={message.content}>
              <div
                className={`w-12 h-12 rounded-xl ${
                  message.profile ? "bg-white" : ""
                }`}
              />
              <div className="flex flex-col items-start">
                {message.profile && (
                  <span className="my-1">
                    {gender === "MALE" ? "옥순" : "영철"}
                  </span>
                )}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0, delay: message.delay }}
                  onAnimationComplete={() => {
                    if (index === messages.length - 1) setMessageLoading(false);
                  }}
                  className="flex items-end gap-2 mb-4"
                >
                  <div className="self-start px-2 py-1 rounded-md shadow-md bg-gray-regular">
                    {message.content}
                  </div>
                  <span className="text-xs min-w-fit">{message.time}</span>
                </motion.div>
              </div>
            </div>
          );

        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0, delay: message.delay }}
            className="flex items-end gap-2 mb-4 ml-auto"
            onAnimationComplete={() => {
              if (index === messages.length - 1) setMessageLoading(false);
            }}
            key={message.content}
          >
            <span className="text-xs min-w-fit">{message.time}</span>
            <div className="self-start px-2 py-1 text-black rounded-md shadow-md bg-yellow-regular">
              {message.content}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Messages;
