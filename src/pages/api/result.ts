import type { NextApiRequest, NextApiResponse } from "next";
import { type } from "os";

type Data = string[];

type Error = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const datas = require("/public/result.json");
  const answerNum = req.query.answersNum as string;

  if (answerNum === "null") return res.status(500).json({ message: "error" });

  if (req.method === "GET") {
    const answerList = answerNum
      ?.slice(1)
      .split("")
      .map((value, index) => ({
        type: [0, 2, 4].includes(index) ? 1 : answerNum[index - 1],
        id: value,
      }));

    const payload = answerList.map((answer) =>
      datas.find(
        (data: any) => data.id === answer.id && answer.type === data.type
      )
    );

    res.status(200).json(payload);
    return;
  }
  return;
}
