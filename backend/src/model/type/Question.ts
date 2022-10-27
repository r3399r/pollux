import { Question } from 'src/model/entity/Question';

export type QuestionType = Question & { tagId: string[] };
