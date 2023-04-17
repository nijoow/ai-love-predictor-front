import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: number;
  question: string[];
  answer: string[];
};
type Error = {
  message: string;
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const datas = require("/public/data.json");
  const id = req.query.id;
  const type = req.query.type;

  if (id === "null" || type === "null")
    return res.status(500).json({ message: "error" });

  if (req.method === "GET") {
    const payload = datas.find(
      (data: any) => data.id === id && data.type === type
    );
    res.status(200).json(payload);
    return;
  }
  return;
}
