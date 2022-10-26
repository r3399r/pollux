import { Question as QuestionEntity } from 'src/model/entity/Question';

export type Question = QuestionEntity & { tagId: string[] };
