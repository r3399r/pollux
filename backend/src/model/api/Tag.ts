import { Tag } from 'src/model/entity/Tag';

export type PostTagRequest = {
  name: string;
};

export type PostTagResponse = Omit<Tag, 'userId'>;

export type GetTagResponse = Omit<Tag, 'userId'>[];
