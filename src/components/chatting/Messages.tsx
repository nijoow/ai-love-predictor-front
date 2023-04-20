import { genderAtom, messageLoadingAtom, messagesAtom } from "@/jotai/atoms";
import { Message } from "@/types/types";
import { motion } from "framer-motion";
import { useAtomValue, useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";

const Messages = () => {
  const ref = useRef<null | HTMLDivElement>(null);

  const [messages] = useAtom(messagesAtom);
  const gender = useAtomValue(genderAtom);
  const [messageLoading, setMessageLoading] = useAtom(messageLoadingAtom);
  const scrollToBottom = () => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  };

  return (
    <div
      className="flex flex-col w-full pl-4 pr-2 overflow-y-scroll custom-scroll"
      ref={ref}
    >
      {messages.map((message, index) => {
        if (message.role === "AI")
          return (
            <div
              className={`flex gap-4 ${message.profile ? "mt-3" : ""}`}
              key={message.content}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0, delay: message.delay }}
                className={`w-12 h-12 rounded-xl ${
                  message.profile ? "bg-white" : ""
                }`}
              />
              <div className="flex flex-col items-start">
                {message.profile && (
                  <motion.span
                    className="my-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0, delay: 1 }}
                  >
                    {gender === "MALE" ? "영철" : "옥순"}
                  </motion.span>
                )}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0, delay: message.delay }}
                  onAnimationComplete={() => {
                    scrollToBottom();

                    if (index === messages.length - 1)
                      setTimeout(() => {
                        setMessageLoading(false);
                      }, 1000);
                  }}
                  className="flex items-end gap-2 mb-4 max-w-[400px]"
                >
                  <div className="self-start px-2 py-1 rounded-md shadow-md bg-gray-regular ">
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
            className="flex items-end gap-2 mb-4 ml-auto mt-3 max-w-[400px]"
            onAnimationComplete={() => {
              scrollToBottom();
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
