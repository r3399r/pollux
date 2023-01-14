export type Question = {
  id: string;
  content: string;
  answer: string | null;
  solution: string | null;
  userId: string;
  dateCreated: Date;
  dateUpdated: Date | null;
};
