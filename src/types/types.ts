export type Message = {
  role: 'USER' | 'AI';
  profile?: boolean;
  content: string;
  delay: number;
  time: string;
};
