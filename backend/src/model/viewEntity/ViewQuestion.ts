export type ViewQuestion = {
  id: string;
  content: string;
  answer: string | null;
  solution: string | null;
  isMathjax: boolean;
  userId: string;
  dateCreated: Date;
  dateUpdated: Date | null;
  tagId: string | null;
};
