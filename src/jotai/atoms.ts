import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = createJSONStorage(() => sessionStorage);

export const genderAtom = atomWithStorage("gender", null, storage);
export const messageLoadingAtom = atom(false);
export const questionAtom = atom(1);
export const answerAtom = atom(0);
export const progressBarAtom = atom(0);

export const messagesAtom = atom<
  {
    id: number;
    role: "AI" | "USER";
    profile: boolean;
    content: string;
    delay: number;
    time: string;
  }[]
>([]);

export const answersAtom = atom<
  {
    id: number;
    type: number;
    content: string;
  }[]
>([]);
