import { Tag } from 'src/model/entity/Tag';

export type PostTagRequest = {
  name: string;
};

export type PostTagResponse = Tag;

export type GetTagResponse = Tag[];

export type PutTagRequest = {
  name: string;
};

export type PutTagResponse = Tag;
